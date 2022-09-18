<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="广告管理">
      <template v-slot:extraright>
        <v-condition name="网站" icon="select" field="website" :enums="serverName" :render="render" />
        <Detail action='add' :data="data" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table width="100%" class="table-striped table-hover col-left-2">
      <tr>
        <td class="col-md-1">选择</td>
        <td class="col-md-2">广告名称</td>
        <td class="col-md-2">尺寸类型</td>
        <td class="col-md-1">广告位置</td>
        <td class="col-md-1">每月/元</td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
        </td>
        <td>{{item.width}} X {{item.height}}</td>
        <td>
          {{item.size_type}}
        </td>
        <td>{{item.price}}</td>
        <td>{{item.start_time}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', ...data }" />
        </td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{id: item.id, ...data }" :render="render" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
            <!-- <span>生成订单</span> -->
            <Popover content="更多" arrow="tb" offset="right" :move="-350" :keys="`static_${index}`">
              <div class="font14" style="width: 350px;">
                <table width="100%" class="table-striped table-hover">
                  <tr>
                    <td class="col-md-1">服务器</td>
                    <td class="col-md-1">平台</td>
                    <td class="col-md-1">出售次数</td>
                  </tr>
                  <tr>
                    <td>{{item.website}}</td>
                    <td>{{item.source}}</td>
                    <td>{{item.sell}}</td>
                  </tr>
                </table>
              </div>
            </Popover>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, ...data }" :sorceData="dataList.list" :render="render" v-if="dataList.list && dataList.list.length > 0" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore
} from '@/utils'
import {
  SERVER_NAME
} from '@/assets/enum'
import Detail from './detail.vue'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Popover
  },
  props: {
    data: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const serverName: any = SERVER_NAME
    const dataList = computed(() => {
      return store.getters['basic/links']['link1'] || []
    });

    const checkedList: any = ref([])

    return {
      dataList,
      checkedList,
      serverName
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="交换友链">
      <template v-slot:extraright>
        <v-condition name="网站" icon="select" field="website" :enums="serverName" :render="render" />
        <Detail action='add' :data="data" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 选择</td>
        <td class="col-md-2">网站名称 </td>
        <td class="col-md-6">链接地址</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', ...data }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-quick :value="item.url" :data="{ id: item.id, field: 'url', ...data }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', ...data }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{id: item.id, ...data }" :render="render" :auth="auth.checked('edit')" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <Popover content="更多" arrow="tb" offset="right" :move="-450" :keys="`static_${index}`">
              <div class="font14" style="width: 500px;">
                <table width="100%" class="table-striped table-hover col-left-1">
                  <tr>
                    <td class="col-md-1">ID</td>
                    <td class="col-md-5">展示站点</td>
                    <td class="col-md-3">站长</td>
                    <td class="col-md-3">联系方式</td>
                  </tr>
                  <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.website}}</td>
                    <td>{{item.webmaster}}</td>
                    <td>{{item.qq}}</td>
                  </tr>
                </table>
              </div>
            </Popover>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, ...data }" :pagination="{total: dataList.pages, page: dataList.page ||  1, pagesize: 25}" :sorceData="dataList.list" :render="render" v-if="dataList.list && dataList.list.length > 0" :auth="auth" />
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
  name: 'ListView',
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
    },
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const serverName: any = SERVER_NAME
    const dataList = computed(() => {
      debugger
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

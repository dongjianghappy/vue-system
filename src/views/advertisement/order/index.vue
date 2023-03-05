<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="广告位置">
      <template v-slot:extraright>
        <v-condition name="网站" icon="select" field="website" :enums="serverName" :render="init" />
        <Detail action='add' :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 序号</td>
        <td class="col-md-2">广告位名称 </td>
        <td class="col-md-4">引用标签</td>
        <td class="col-md-2">站点</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-quick :value="item.sort" :data="{ id: item.id, field: 'sort', coding }" />
        </td>
        <td>
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding }" />
        </td>
        <td>
          <v-quick :value="item.label" :data="{ id: item.id, label: 'url', coding }" />
        </td>
        <td>
          <template v-for="(list, index) in serverName" :key="index">
            <span v-if="item.website === list.value" class="mr15">{{list.name}}</span>
          </template>
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding }" :render="render" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList.list" :render="render" v-if="dataList.list && dataList.list.length > 0" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
  codings,
  onMounted
} from '@/utils'
import {
  SERVER_NAME
} from '@/assets/enum'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
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
    const coding: any = codings['advertisement_position'];
    const dataList: any = ref([])
    const serverName: any = SERVER_NAME
    const checkedList: any = ref([])

    // 初始化
    function init(params: any) {
      const sssss: any = {
        page: 1,
        pagesize: 100
      }

      Object.assign(sssss, params)
      store.dispatch('common/Fetch', {
        data: {
          coding,
          ...sssss
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    onMounted(() => {
      init({
        page: 1
      })
    })

    return {
      coding,
      serverName,
      init,
      dataList,
      checkedList
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="所有采集列表">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-4">标题</td>
        <td class="col-md-2">节点</td>
        <td class="col-md-2">入库时间</td>
        <td class="col-md-2">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.title}}
        </td>
        <td>{{item.parent}}</td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding }" :auth="true" />
        </td>
        <td>
          <v-confirm name="删除" :data="{id: item.id, coding, operating: 'remove' }" type="text" api="removeAndRestore" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  codings
} from '@/utils'
export default defineComponent({
  name: 'HomeViewdd',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings['collection'].art;
    const store = useStore();
    const route = useRoute();
    const dataList: any = ref([])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      init()
    })

    function init() {
      const param: any = {
        page: 1,
        pagesize: 10
      }

      if (route.query.fid) {
        param.fid = route.query.fid
      }

      store.dispatch('common/Fetch', {
        api: "collectionList",
        data: {
          ...param
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      auth: proxy.$auth.init('collection/art')
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="回收站">
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-3">文档名称</td>
        <td class="col-md-2">节点</td>
        <td class="col-md-2">入库时间</td>
        <td class="col-md-2">删除时间</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.title}}
        </td>
        <td>
          {{item.parent}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td> {{item.delete_datetime}}</td>
        <td>
          <v-space>
            <span>
              <v-confirm name="还原" :data="{id: item.id, coding}" type="text" api="removeAndRestore" :render="init" operating="restore" :auth="auth.checked('reduction')"></v-confirm>
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="restore" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :pagination="{total: dataList.pages, page: dataList.page ||  1, pagesize: 25}" :sorceData="dataList" :render="init" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'
export default defineComponent({
  name: 'HomeViewdd',
  components: {

  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = codings['collection'].art;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "collectionList",
        data: {
          recycle: true,
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init,
      auth: proxy.$auth.init('collection/art')
    }
  }
})
</script>

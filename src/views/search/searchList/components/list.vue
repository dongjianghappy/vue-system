<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">id</td>
    <td class="col-md-7 ">关键词</td>
    <td class="col-md-2 ">用户</td>
    <td class="col-md-2">搜索时间</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.word}}</td>
    <td>{{item.uid}}</td>
    <td>{{item.times}}</td>
    <td></td>
  </tr>
</table>
<div class="mt15 align_right">
  <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute,
  ref,
  codings
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {

  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const coding: any = codings
    const store = useStore();
    const route = useRoute();
    const dataList: any = ref([]);

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        data: {
          coding: route.path.indexOf("talk") === -1 ? coding.search.list : coding.talk.search.list,
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      dataList,
      init
    }
  }
})
</script>

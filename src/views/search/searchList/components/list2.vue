<template>
<table class="table-striped table-hover col-left-1">
  <tr class="th">
    <td class="col-md-2">时间</td>
    <td class="col-md-2 ">词量</td>
    <td class="col-md-2">新词量</td>
    <td class="col-md-2">搜索次数</td>
    <td class="col-md-2">用户量</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td>{{item.times}}</td>
    <td>{{item.word}}</td>
    <td>{{item.new_word}}</td>
    <td>{{item.search}}</td>
    <td>{{item.user}}</td>
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
          coding: route.path.indexOf("talk") === -1 ? coding.search.statistics : coding.talk.search.statistics,
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

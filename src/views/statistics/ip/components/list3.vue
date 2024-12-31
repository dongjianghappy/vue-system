<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">ID</td>
    <td class="col-md-9">IP</td>
    <td class="col-md-2">访问时间</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.ip}}</td>
    <td>{{item.datetime}}</td>
  </tr>
</table>
<div class="mt15 align_right">
  <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  useStore,
  useRoute,
  ref,
  codings
} from '@/utils'

    const coding: any = codings
        const store = useStore();
    const route = useRoute();

    const dataList: any = ref([])


    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        data: {
          coding: route.path.indexOf("talk") === -1 ? coding.statistics.ip_lib : coding.talk.statistics.ip_lib,
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)
</script>

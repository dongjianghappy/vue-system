<template>
<table class="table-striped table-hover col-left-34">
  <tr class="th">
    <td class="col-md-1">id</td>
    <td class="col-md-2">IP</td>
    <td class="col-md-3">页面来源</td>
    <td class="col-md-3">受访页面</td>
    <td class="col-md-1">系统</td>
    <td class="col-md-2">访问时间</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.ip}}</td>
    <td>{{item.source_url}}</td>
    <td>{{item.url}}</td>
    <td>{{item.system}}</td>
    <td>{{item.datetime}}</td>
  </tr>
</table>
<v-nodata :data="dataList || []" />
</template>

<script setup lang="ts">
import {
  computed,
  useStore,
  useRoute
} from '@/utils'

    const store = useStore();

    const dataList = computed(() => {
      return store.getters['setting/ip3'].list || []
    });
    
</script>

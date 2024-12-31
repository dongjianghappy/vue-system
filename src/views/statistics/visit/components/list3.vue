<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">序号</td>
    <td class="col-md-9">受访页面URL</td>
    <td class="col-md-1">浏览次数</td>
    <td class="col-md-1">占比</td>
  </tr>
   <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.source_url}}</td>
    <td>{{item.url}}</td>
    <td>{{item.visit}}</td>
    <td>{{item.nums}}</td>
  </tr>
</table>
<v-nodata :data="dataList || []" />
</template>

<script setup lang="ts">
import {
    computed,
  useStore
} from '@/utils'
    const store = useStore();
    const dataList = computed(() => {
      return store.getters['setting/visit2'].list || []
    });
    
</script>

<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">id</td>
    <td class="col-md-9 ">关键词</td>
    <td class="col-md-2">搜索时间</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.word}}</td>
    <td>{{item.times}}</td>
    <td></td>
  </tr>
</table>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
  const props: any = defineProps({
    dataList: {
      type: Object,
      default: () => {
        return []
      }
    }
  })
</script>

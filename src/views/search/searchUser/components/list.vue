<template>
<table class="table-striped table-hover col-left-23">
  <tr class="th">
    <td class="col-md-1">用户</td>
    <td class="col-md-2 ">关键词</td>
    <td class="col-md-7">搜索时间</td>
    <td class="col-md-2">时间</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.nickname}}</td>
    <td>{{item.word}}</td>
    <td>
      {{item.list}}
      <span class="bg-eee mr5 mb5 plr5" style="display: inline-block;" v-for="(list, i) in item.lists" :key="i">{{list.time}}</span>
    </td>
    <td>{{item.times}}</td>
  </tr>
</table>
<div class="mt15 align_right">
  <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
</div>
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

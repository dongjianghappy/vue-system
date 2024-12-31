<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">{{data.currentTabs === 0 ? 'Ta们给我留言' : '给Ta们留言'}}</td>
        <td class="col-md-5">留言内容</td>
        <td class="col-md-2">留言日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td style="line-height: 35px;">
          <template v-if="data.currentTabs === 0">
            <v-avatar :data="{uid: item.from_uid, photos: item.to_photos}" />{{item.to_nickname}}
          </template>
          <template v-else>
            <v-avatar :data="item" />{{item.nickname}}
          </template>
        </td>
        <td>
          {{item.content}}
        </td>
        <td>{{item.times}}</td>
        <td>
        </td>
        <td>
          <v-space>
            <Praise :data="{...item, coding: data.coding.praise}" />
            <Reply :data="{...item, coding: data.coding.list}"></Reply>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
import Praise from '../../../features/praise/list.vue'
import Reply from '../reply/reply.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    dataList: {
      type: Array,
      default: []
    }
  })
</script>

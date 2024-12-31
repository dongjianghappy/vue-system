<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-5">留言内容</td>
        <td class="col-md-2">留言日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td class="flex" style="line-height: 35px;">
          <div style="width: auto"><User :data="{uid: item.from_uid, nickname: item.to_nickname, photos: item.to_photos}" /></div>
          <div class="w25 plr5">给</div>
          <div style="width: auto"><User :data="item" /></div>
        </td>
        <td>
          {{item.content}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: data.coding.list }" :auth="true" />
        </td>
        <td>
          <v-space>
            <Praise :data="{...item, coding: data.coding.praise}" />
            <Reply :data="{...item, coding: data.coding.list}" />
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore,
} from '@/utils'
import User from '../user/index.vue'
import Praise from '../../../features/praise/list.vue'
import Reply from '../reply/reply.vue'

  const props: any = defineProps({
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  })
</script>

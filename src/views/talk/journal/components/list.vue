<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-5">日志 </td>
        <td class="col-md-2">发布日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td class="flex" style="line-height: 35px;">
          <User :data="{...item, coding: data.coding}" />
        </td>
        <td>
          【{{item.parent}}】{{item.title}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: data.coding.list }" :auth="true" />
        </td>
        <td>
          <v-space>
            <Praise :data="{...item, coding: data.coding.praise}" />
            <!-- <Comment :data="{...item, coding: data.coding.comment}" /> -->
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
import User from './user.vue'
import Praise from '../../../features/praise/list.vue'
// import Comment from '../../../features/comment/index.vue'

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

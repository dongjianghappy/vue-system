<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-6">留言内容</td>
        <td class="col-md-2">留言日期</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td style="line-height: 35px;">
          <User :data="item" />
          给
          <User :data="item" />
          留言
        </td>
        <td>
          {{item.content}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-space>
            <span>
              <v-confirm name="审核" :data="{id: item.id, management_checked: 1, coding: data.coding.list }" type="text" api="checkContent" :render="render" operating="check" :auth="true"></v-confirm>
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: data.coding.list }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
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
  ref
} from '@/utils'
import User from '../user/index.vue'
import ReturnDialog from "../../../channel/list/components/returnDialog.vue"

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

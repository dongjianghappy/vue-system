<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-5">回复内容</td>
        <td class="col-md-2">回复日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td class="flex" style="line-height: 35px;">
          <User :data="item" />
        </td>
        <td>
          {{item.content}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding }" :auth="true" />
        </td>
        <td>
          <v-space>
            <Praise :data="{...item, coding: coding.praise}" />
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
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  useRouter,
  codings,
} from '@/utils'
import User from '../user/index.vue'
import Praise from '../../../features/praise/list.vue'
const store = useStore();
const route = useRoute();
const router: any = useRouter();
const coding: any = codings.talk.message_board;
const dataList: any = ref({})

// 初始化
function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 25
  }

  Object.assign(params, param)
  
  store.dispatch('common/Fetch', {
    api: 'userMessageBoardReply',
    data: {
      ...params
    }
  }).then((res: any) => {
    debugger
    dataList.value = res.result
  })
}
onMounted(init)
</script>

<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">留言用户</td>
        <td class="col-md-5">留言内容</td>
        <td class="col-md-2">留言日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td style="line-height: 35px;">
          <v-avatar :data="item" />{{item.nickname}}
        </td>
        <td>
          {{item.content}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: data.coding.list }" :auth="true" />
          <!-- :auth="auth.checked('status')" -->
        </td>
        <td>
          <v-space>
            <Praise :data="{...item, coding: data.coding.praise}" />
            <Reply :data="{...item, coding: data.coding.list}" api="delete" :render="init"></Reply>
          </v-space>
          
          <!-- :auth="auth.checked('reply')" -->
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
import Praise from '../../../features/praise/list.vue'
import Reply from './reply.vue'

  const props: any = defineProps({
    data: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  })
    const store = useStore();
    const dataList = computed(() => {
      return store.getters['basic/messageBoard'].articleList || []
    });

    const checkedList: any = ref([])
</script>

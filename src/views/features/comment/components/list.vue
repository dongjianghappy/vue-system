<template>
<div class="module-wrap">
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-234">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-2">用户</td>
        <td class="col-md-2">评论对象</td>
        <td class="col-md-2">评论内容</td>
        <td class="col-md-2">评论时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          <User :data="{...item, coding: data.coding.art}" />
        </td>
        <td>
          <span v-if="item.title">{{item.title}}</span>
          <span v-html="item.summary" v-else></span>
         <List :data="{...item, coding: data.coding.comment}" name="累计评论" />
        </td>
        <td>
         {{item.content}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td><v-switch :data="{ item, field: 'checked', coding: data.coding.comment }" :auth="true" /></td>
        <td>
          <v-space>
            <v-confirm name="删除" :data="{id: item.id, coding: data.coding.comment}" type="text" api="delete" :render="init" operating="delete"  ></v-confirm>
            <Praise :data="{...item, coding: data.coding.praise}" />
            <Reply :data="{...item, coding: data.coding.comment}" />
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding: data.coding.comment }" :sorceData="dataList.list" :render="init" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useProps
} from '@/utils'
import User from '../user/index.vue'
import List from './list111.vue'
import Praise from '../../praise/list.vue'
import Reply from '../reply/reply.vue'

const props: any = defineProps({
  ...useProps,
  dataList: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const checkedList: any = ref([])

</script>

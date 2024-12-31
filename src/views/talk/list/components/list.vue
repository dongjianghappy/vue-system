<template>
<div class="module-wrap">
  <div class="module-content">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-4">内容</td>
        <!-- <td class="col-md-1">转载</td> -->
        <td class="col-md-2">发布时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-3">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <User :data="item" />
        </td>
        <td>
          <span v-html="item.summary"></span>
          <span v-if="item.type === 'img'">
            <v-thumbnail :data="item" :coding="coding.art" icon="img" :hasInfo="false" />
          </span>
          <span v-if="item.type === 'video'">
            <v-thumbnail :data="item" :coding="coding.art" icon="video" type="Video" />
          </span>
        </td>
        <!-- <td>{{item.forwarding}}</td> -->
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space class="relative">
            <Comment :data="{...item, coding: coding.comment}" />
            <Praise :data="{...item, coding: coding.praise}" />
            <Collect :data="{...item, coding: coding.collect}" />
            <Detail action="edit" :data="{id: item.id, coding: coding.art}" :render="render" />
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
        <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: coding.art }" type="text" api="changeData" :render="render" operating="setTop"></v-confirm>
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
  codings
} from '@/utils'
import User from './user.vue'
import Detail from './detail.vue'
import Praise from '../../../features/praise/list.vue'
import Comment from '../../../features/comment/components/list111.vue'
import Collect from '../../../features/collect/list.vue'
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
    const coding = codings.talk
    const dataList = computed(() => {
      return store.getters['talk/talkList1']|| []
    });

    const checkedList: any = ref([])
</script>

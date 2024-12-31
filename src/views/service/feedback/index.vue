<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="意见反馈">
      <template v-slot:extraright>
        <v-search field="content" placeholder="内容查找" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-5">内容</td>
        <td class="col-md-2">日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td style="line-height: 35px;">
          <v-avatar :data="item" />{{item.nickname}}
        </td>
        <td>
          {{item.content}}
          <v-thumbnail :data="item" :coding="coding.list" icon="img" :hasInfo="false" v-if="item.image.length > 0" />
        </td>
        <td>{{item.times}}</td>
        <td><v-switch :data="{ item, field: 'checked', coding: coding.list }" :auth="true" /></td>
        <td>
          <v-space>
            <Praise :data="{...item, coding: coding.praise}" />
            <Comment :data="{...item, coding: coding.comment}" />
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  useStore,
  codings
} from '@/utils'
import Praise from '../../features/praise/list.vue'
import Comment from '../../features/comment/components/list111.vue'

    const store = useStore();
    const dataList = computed(() => store.getters['basic/feedback']);
    const coding: any = codings.service.feedback;

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        api: 'feedback',
        state: 'feedback',
        data: {
          coding: coding.list,
          ...params
        }
      })
    }

    onMounted(init)
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="点赞管理">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-8">点赞内容</td>
        <td class="col-md-2">点赞时间</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <User :data="item" />
        </td>
        <td>
          <span v-if="item.title">{{item.title}}</span>
          <span v-html="item.summary" v-else></span>
          <List :data="{...item, coding: coding.praise}" name="累计点赞" />
        </td>
        <td>
          {{item.times}}
        </td>
      </tr>
    </table>
    <!-- <v-nodata :data="dataList.list" /> -->
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
  ref,
  channels
} from '@/utils'
import User from './user.vue'
import List from './list.vue'
    const coding: any = channels().coding;
    const store = useStore();
    const dataList: any = ref({})

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)
      store.dispatch('basic/Fetch', {
        api: 'articleRelated',
        data: {
          coding: coding.art,
          name: 'praise',
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
    onMounted(init)
</script>

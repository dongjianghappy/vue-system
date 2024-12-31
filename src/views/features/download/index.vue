<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="下载管理">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-6">下载内容</td>
        <td class="col-md-2">下载时间</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <User :data="item" />
        </td>
        <td>
         {{item.title}}
         <List :data="{...item, coding}" name="累计下载" />
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'
import User from './user.vue'
import List from './list.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.download;
    const checkedList: any = ref([])

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: 'download',
        data: {
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="常识管理">
      <template v-slot:extraright>
        <space>
          <Detail action='add' :data="{ coding: coding.cate }" :render="init" />
        </space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-8">名称</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <template v-for="(item, index) in dataList" :key="index">
        <tr :draggable="isMove" class="dragObj" :index="`0_${index}`">
          <td>
            <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
          </td>
          <td>
            {{item.name}}
          </td>
          <td>
            <v-switch :data="{ item, field: 'status', coding: coding.cate }" :auth="true" />
          </td>
          <td>
            <v-space>
              <List :data="{...item, coding}" />
              <Detail action="edit" :data="{id: item.id, coding: coding.cate}" :disabled="isMove" :param="param" :render="init" />
              <v-confirm name="删除" :data="{id: item.id, coding: coding.cate}" :disabled="isMove" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </v-space>
          </td>
        </tr>
      </template>
    </table>
    <v-nodata :data="dataList" />
    <div class="mt25 align_center" v-if="dataList.total > 10">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'

import Detail from './components/detail.vue'
import List from '../list/index.vue'

    const store = useStore();
    const coding: any = codings['common_sense'];
    const dataList: any = ref([])
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "cateList",
        data: {
          coding: coding.cate
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })
</script>

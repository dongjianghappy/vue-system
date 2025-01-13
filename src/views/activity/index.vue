<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="活动管理">
      <template v-slot:extraright>
        <Detail :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-6">活动名称</td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">浏览</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.title}}
          <span v-if="item.image.length">
            <v-thumbnail :data="item" :coding="coding.activity" icon="img" :hasInfo="false" />
          </span>
        </td>
        <td>{{item.start_time}} - {{item.last_time}}</td>
        <td>{{item.visit}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', coding: coding.activity }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>

              <Detail action="edit" :data="{id: item.id, coding}" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
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
  ref,
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings;
    const checkedList: any = ref([])
    const pagesize: any = 10

    function init(param: any) {

const params: any = {
        page: 1,
        pagesize: pagesize
      }

      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding: coding.activity,
          ...params
        }
      })
    }

    onMounted(() => {
      init({
        page: 1
      })
    })
</script>

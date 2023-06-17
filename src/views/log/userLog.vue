<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="用户登录"></v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-123">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-1">身份</td>
        <td class="col-md-1">浏览器类型</td>
        <td class="col-md-1">语言</td>
        <td class="col-md-1">操作系统</td>
        <td class="col-md-2">IP</td>
        <td class="col-md-2">地区</td>
        <td class="col-md-2">登录时间</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td style="display: flex;">
          <div style=" width: 32px; height: 32px; border-radius: 50%; overflow: hidden; display: inline-block;">
            <img :src="item.photos" class="mr10" style="width: 32px; height: 32px;">
          </div>
          <div class="pl5" style="flex: 1; height: 32px; line-height: 32px; display: inline-block;">
            {{item.nickname}}
          </div>
        </td>
        <td>{{item.role}}</td>
        <td>{{item.browser}}</td>
        <td>{{item.lang}}</td>
        <td>{{item.system}}</td>
        <td>{{item.ip}}</td>
        <td>{{item.area}}</td>
        <td>{{item.times}}</td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  useStore,
  codings
} from '@/utils'

export default defineComponent({
  name: 'userLogView',
  setup(props, context) {
    const store = useStore();
    const coding: any = codings['user'].log;
    const dataList = computed(() => store.getters['basic/userLog']);

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        state: 'userLog',
        data: {
          coding,
          ...params
        }
      })
    }

    onMounted(init)

    return {
      dataList,
      init
    }
  }
})
</script>

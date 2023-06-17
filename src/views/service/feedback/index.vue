<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="意见反馈"></v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-6">内容</td>
        <td class="col-md-2">日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td style="line-height: 35px;">
          <v-avatar :data="item" />{{item.nickname}}
        </td>
        <td>{{item.content}}</td>
        <td>{{item.times}}</td>
        <td></td>
        <td>
          <span>删除</span>
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

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  useStore,
  codings
} from '@/utils'

export default defineComponent({
  name: 'FeedbackView',
  props: {},
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['basic/feedback']);
    const coding: any = codings['service'].feedback;

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        state: 'feedback',
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

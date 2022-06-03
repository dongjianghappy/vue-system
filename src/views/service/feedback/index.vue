<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="意见反馈"></v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-2">用户</td>
        <td class="col-md-5">反馈内容</td>
        <td class="col-md-2">反馈日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td style="line-height: 35px;">
          <v-avatar :data="item" />{{item.nickname}}
        </td>
        <td>{{item.title}}</td>
        <td></td>
        <td></td>
        <td>
          <span>删除</span>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdd',
  components: {},
  props: {},
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['basic/feedback']);

    function init() {
      store.dispatch('basic/Fetch', {
        api: "feedback",
        state: 'feedback',
        data: {
          page: 1,
          pagesize: 10
        }
      })
    }

    onMounted(init)

    return {
      dataList
    }
  }
})
</script>

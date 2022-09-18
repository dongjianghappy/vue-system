<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="管理员登录"></v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-2">管理员名称</td>
        <td class="col-md-1">身份</td>
        <td class="col-md-1">浏览器类型</td>
        <td class="col-md-1">语言</td>
        <td class="col-md-1">操作系统</td>
        <td class="col-md-2">IP</td>
        <td class="col-md-2">地区</td>
        <td class="col-md-2">登录时间</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>{{item.username}}</td>
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
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'ManageView',
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['basic/manageLog']);

    function init() {
      store.dispatch('basic/Fetch', {
        state: 'manageLog',
        data: {
          coding: "U0006",
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

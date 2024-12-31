<template>
<div>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-1">头像</td>
    <td class="col-md-2">会员账号</td>
    <td class="col-md-2">用户名</td>
    <td class="col-md-2">电子邮箱</td>
    <td class="col-md-2">注册原因</td>
    <td class="col-md-2">注册时间</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
<v-nodata :data="dataList.list" />
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  useStore,
  useRoute
} from '@/utils'

  const props: any = defineProps({
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
  })
    const store = useStore();
    const route = useRoute();

    function init() {
      store.dispatch('common/Fetch', {
        api: "todayIp",
        data: {}
      }).then(res => {

      })
    }
    onMounted(init)
</script>

<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1 align-center">选择</td>
    <td class="col-md-6">数据库表</td>
    <td class="col-md-1">大小</td>
    <td class="col-md-2">备份时间</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
<v-nodata :data="dataList" />
</template>

<script setup lang="ts">
import {
  onMounted,
  useStore
} from '@/utils'

  const emit: any = defineEmits(['onClick'])
  
    const store = useStore();

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: "S0003",
          page: 1,
          pagesize: 25
        }
      }).then(res => {

      })
    }

    function handleclick() {
      emit('onClick')
    }
    onMounted(init)
    
</script>

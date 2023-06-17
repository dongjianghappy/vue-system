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

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'v-List2',
  emits: ['onClick'],
  setup(props, context) {
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
      context.emit('onClick')
    }
    onMounted(init)
    return {
      handleclick
    }
  }
})
</script>

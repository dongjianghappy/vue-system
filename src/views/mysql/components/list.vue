<template>
<table width="100%" class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1 align-center">选择</td>
    <td class="col-md-2">数据库表</td>
    <td class="col-md-1">类型</td>
    <td class="col-md-1">记录</td>
    <td class="col-md-1">整理</td>
    <td class="col-md-1">大小</td>
    <td class="col-md-1">多余</td>
    <td class="col-md-2">创建时间</td>
    <td class="col-md-1 align-center">操作</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>
      <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
    </td>
    <td>{{item.dbname}}</td>
    <td>{{item.dbtype}}</td>
    <td>{{item.dbrow}}</td>
    <td>{{item.dbcharset}}</td>
    <td>{{item.dbsize}}</td>
    <td>{{item.dbut}}</td>
    <td>{{item.dbtime}}</td>
    <td>
      <span><Exports :data="item" /></span>
    </td>
  </tr>
</table>
<v-nodata :data="dataList" />
</template>

<script lang="ts">
import Exports from './export.vue'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute,
  ref
} from '@/utils'

export default defineComponent({
  name: 'v-List',
  emits: ['onClick'],
  components: {
    Exports
  },
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "mysql",
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    function handleclick() {
      context.emit('onClick')
    }
    onMounted(init)
    return {
      dataList,
      handleclick
    }
  }
})
</script>

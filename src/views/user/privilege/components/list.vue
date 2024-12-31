<template>
<table class="table-striped table-hover col-left-12">
  <tr class="th">
    <td class="col-md-2">名称</td>
    <td class="col-md-1">图标</td>
    <td class="col-md-6">应用功能关联</td>
    <td class="col-md-1">状态</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td>
      <i class="iconfont" :class="`icon-${item.icon}`" />
      {{item.name}}</td>
    <td>{{item.description}}</td>
    <td>
      {{item.app}}
    </td>
    <td>
      <v-switch :data="{ item, field: 'status', coding: coding }" :auth="true" />
    </td>
    <td>
      <Detail action="edit" :data="{id: item.id, coding}" :render="init" />
    </td>
  </tr>
</table>
<v-nodata :data="dataList.list" />
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'
import Detail from './detail.vue'

  const props: any = defineProps({
    index: {
      type: Number,
      default: 0
    }
  })
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = codings.user.privilege;
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('partner')

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 10,
          type: props.index
        }
      }).then((res) => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })
</script>

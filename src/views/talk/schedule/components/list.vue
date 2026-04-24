<template>
<div>
  <table class="table-striped table-hover col-left-23">
    <tr class="th">
      <td class="col-md-1">名称</td>
      <td class="col-md-4">描述</td>
      <td class="col-md-2">能量</td>
      <td class="col-md-2">同步到动态</td>
      <td class="col-md-1">状态</td>
      <td class="col-md-2">操作</td>
    </tr>
    <tr v-for="(item, index) in dataList" :key="index" :index="index">
      <td>
        {{item.emoji}}
        {{item.name}}
      </td>
      <td>
        {{item.description}}
      </td>
      <td>
        {{item.energy_name || '-'}}
      </td>
      <td>
        {{item.sync === '1' ? '是' : '否'}}
      </td>
      <td>
        <v-switch :data="{ item, field: 'status', coding: data.coding }" :auth="true" />
      </td>
      <td>
        <Kind :data="{ fid: item.id, coding: data.coding }" />
        <Detail action="edit" :data="{ id: item.id, coding: data.coding }" :render="render" />
      </td>

    </tr>
  </table>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
} from '@/utils'
import Detail from './detail.vue'
import Kind from './kind.vue'
  const props: any = defineProps({
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: 0
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  })
</script>

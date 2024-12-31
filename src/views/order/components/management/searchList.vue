<template>
  <div class="mt30 plr15">
  <table class="table-striped table-hover col-left-12">
    <tr class="th">
      <td class="col-md-2">订单号</td>
      <td class="col-md-3">订单名称</td>
      <td class="col-md-1">类型</td>
      <td class="col-md-2">价格(元/周期)</td>
      <td class="col-md-2">下单日期</td>
      <td class="col-md-2">状态</td>
    </tr>
    <tr v-for="(item, index) in dataList" :key="index">
      <td>
        {{item.number}}
      </td>
      <td>
        {{item.name}}
      </td>
      <td>{{item.type}}</td>
      <td>{{item.price}}</td>
      <td>{{item.start_time}}</td>
      <td v-if="item.status === '0'">
        <v-confirm name="确认" :data="{id: item.id, coding }" type="text" api="confirmOrder" :render="init" operating="confirmOrder" :auth="false"></v-confirm>
      </td>
      <td v-else-if="item.status === '1'">
        <span>{{item.progress}}</span>
      </td>
      <td v-else>
        <span>33</span>
      </td>
    </tr>
  </table>
  </div>
</template>

<script setup lang="ts">
import {
  defineExpose,
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'

const props: any = defineProps({
  dataList: {
    type: Object,
    default: () => {
      return []
    }
  }
})

</script>

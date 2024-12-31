<template>
  <table class="table-striped table-hover col-left-12">
    <tr class="th">
      <td class="col-md-2">订单号</td>
      <td class="col-md-3">订单名称</td>
      <td class="col-md-1">类型</td>
      <td class="col-md-2">价格(元/周期)</td>
      <td class="col-md-2">创建日期</td>
      <td class="col-md-2" v-if="status === '0'">操作</td>
      <td class="col-md-2" v-else-if="status === '1'">完成进度</td>
      <td class="col-md-2" v-else>完成日期</td>
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
      <td v-if="status === '0'">
        <v-confirm name="确认" :data="{id: item.id, coding }" type="text" api="confirmOrder" :render="init" operating="confirmOrder" :auth="false"></v-confirm>
      </td>
      <td v-else-if="status === '1'">
        <span>{{item.progress}}</span>
      </td>
      <td v-else>
        <span>33</span>
      </td>
    </tr>
  </table>
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
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  status: {
    type: String,
    default: '0'
  }
})

    const store = useStore()
    const coding = codings.order

   const dataList: any = ref({})
   defineExpose({init})

    function init() {
      store.dispatch('common/Fetch', {
        api: 'orderList',
        data: {
          coding,
          type: props.data.type,
          status: props.status,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    onMounted(() => {
      init()
    })
</script>

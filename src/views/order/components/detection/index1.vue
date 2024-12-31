<template>
<div style="height: 410px">
  <div class="mb25 flex">
    <div style="flex: 1">点击开始检测按钮检测未生产订单的商品</div>
    <div class="w80" @click="handleClick">开始检测</div>
  </div>
  <div v-if="dataList.length">
    <div class="flex">
      <div style="flex: 1">名称</div>
      <div class="w80"></div>
    </div>
  <div class="pr10" style="height: 300px; overflow-y: auto">
    <div class="flex" v-for="(item, index) in dataList" :key="index">
      <div style="flex: 1">{{item.name}}</div>
      <div class="w80" ></div>
    </div>
  </div>
  <div class="align_right">
    <span class="mr15">当前检测出{{dataList.length}} 条未生成订单数据</span>
    <span @click="handleClose">生成订单</span>
  </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  codings,
  onMounted
} from '@/utils'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const coding = codings.order
    const isShow: any = ref(false)
    const dialog: any = ref(null)
    const dataList: any = ref({})

function handleClick() {
      
      store.dispatch('common/Fetch', {
        api: "orderDetection",
        data: {
          coding: props.data.coding,
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    function handleClose(){
      store.dispatch('common/Fetch', {
        api: "updateOrderDetection",
        data: {
          coding: props.data.coding,
        }
      }).then((res: any) => {
        props.render()
      })
    }
</script>

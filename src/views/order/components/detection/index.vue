<template>
<v-button v-model:show="isShow" :disabled="true">
  订单生成
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="订单生成" :style="{width: '1000', height: '550'}" :data="data" :hasfooter="false" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div style="height: 410px">
      <div class="mb25 flex">
        <div style="flex: 1">以下列表为未生成订单的商品</div>
        <!-- <div class="w80" @click="handleDetection">开始检测</div> -->
      </div>
      <div v-if="dataList.length">
        <div class="flex">
          <div style="flex: 1">名称</div>
          <div class="w80"></div>
        </div>
      <div class="pr10" style="height: 300px; overflow-y: auto">
        <div class="flex" v-for="(item, index) in dataList" :key="index">
          <div style="flex: 1">{{item.name}}</div>
          <div class="w80" @click="handleCreate(item)">生成订单</div>
        </div>
      </div>
      <div class="align_right">
        <span class="mr15">当前检测出{{dataList.length}} 条未生成订单数据</span>
        <span @click="handleCreate('all')">全部生成订单</span>
      </div>
      </div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch
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
    const isShow: any = ref(false)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })
    
    function init() {
      store.dispatch('common/Fetch', {
        api: "orderDetection",
        data: {
          coding: props.data.coding,
          type: props.data.type
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    function handleCreate(param: any){
      const params: any = {
        type: props.data.type
      }

      if(param instanceof Object){
        params.id = param.id
      }

      store.dispatch('common/Fetch', {
        api: "updateOrderDetection",
        data: {
          coding: props.data.coding,
          ...params
        }
      }).then((res: any) => {
        init()
      })
    }
</script>

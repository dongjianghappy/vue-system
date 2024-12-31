<template>
<v-button v-model:show="isShow" :disabled="true">
  订单管理
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="订单管理" :style="{width: '1000', height: '550'}" :data="data" :hasfooter="false" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="flex">
      <div class="w120 pl15">
        <span @click="handleClear" v-if="dataList.length > 0" >返回列表</span>
      </div>
      <div class="align_right" style="flex: 1"><v-search :render="search" field="name" placeholder="订单号查询" /></div>
    </div>
    <SearchList :dataList="dataList" v-if="dataList.length > 0" />
    <Management :data="data" v-else />
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  codings
} from '@/utils'

import Management from './list.vue'
import SearchList from './searchList.vue'

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
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
      }
    })

    function search(param: any) {
      store.dispatch('common/Fetch', {
        api: 'orderList',
        data: {
          coding,
          type: props.data.type,
          number: param.name,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    function handleClear(){
      dataList.value = []
    }
</script>

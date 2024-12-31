<template>
<v-button v-model:show="isShow" :disabled="true">
  订单
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="订单" :style="{width: '1000', height: '500'}" :data="data" :hasfooter="false" @submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="[{name: '订单管理'},{name: '订单检测'},{name: '订单报表'}]" :isEmit="true">
      <template v-slot:extra>
        <v-search :render="init" field="name" placeholder="输入订单号号或名称" />
      </template>
      <template v-slot:content1>
        <Searchlist :dataList="dataList" v-if="dataList.length > 0" />
        <Management v-else />
      </template>
      <template v-slot:content2>
        <Detection :data="data" />
      </template>
      <template v-slot:content3>
        33
      </template>
    </v-tabs>
    
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

import Management from './management/list.vue'
import Detection from './detection/index1.vue'
import Searchlist from './management/searchList.vue'

  const props: any = defineProps({
    title: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
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

    function init() {
      store.dispatch('common/Fetch', {
        api: 'orderList',
        data: {
          coding,
          type: 'link',
          status: props.status,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }
</script>

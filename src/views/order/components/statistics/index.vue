<template>
<v-button v-model:show="isShow" :disabled="true">
  订单统计
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="订单统计" :style="{width: '1000', height: '550'}" :data="data" :hasfooter="false" @submit="submit">
  <template v-slot:content v-if="isShow">
  <v-tabs :tabs="[{name: '数据统计'},{name: '每月订单'},{name: '来源统计'}]" :isEmit="true"> 
    <template v-slot:extra>
      <v-space>
        <v-condition name="年份" :defaultValue="{value: '2023', name: '2023'}" icon="sort" field="year" :enums="yaerList" :render="init" />
        <v-condition name="网站" icon="select" field="website" :enums="website" :render="init" />
      </v-space>
    </template>
    <template v-slot:content1>
      <Total :data="total" />
    </template>
    <template v-slot:content2>
      <Month :data="detail" />
    </template>
    <template v-slot:content3>
      <Source :data="source" />
    </template>
  </v-tabs>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  computed,
  ref,
  useStore,
  watch,
  codings
} from '@/utils'

import Month from './month.vue'
import Source from './source.vue'
import Total from './total.vue'
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
    const website = computed(() => store.getters['basic/site'].tabs);
    const isShow: any = ref(false)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

const total: any = ref({})
const detail: any = ref({})
const source: any = ref({})
const yaerList = [{
  value: '2022',
  name: '2022'
}, {
  value: '2021',
  name: '2021'
}, {
  value: '2020',
  name: '2020'
}]

function init(param: any){
  debugger
  store.dispatch('common/Fetch', {
    api: 'orderDataStatistics',
    data: {
      coding,
      type: 'link',
      ...param
    }
  }).then(res => {
    total.value = res.result.total
    let aaa = res.result.month
    detail.value = {
      data: {
        labels: aaa.label,
        series: [
          [...(aaa.value && aaa.value.num) || []]
        ]
      },
      options: {
        title: [],
        height: 300
      }
    }

    let bbb = res.result.source
    source.value = {
      data: {
        labels: bbb.label,
        series: [
          [...(bbb.value && bbb.value.num) || []]
        ]
      },
      options: {
        title: [],
        height: 300
      }
    }
  })
}
</script>

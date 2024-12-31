<template>
  <div style="height: 460px">
  <v-tabs :tabs="[{name: '新订单'},{name: '进行中'},{name: '已完成'}]" :isEmit="true"> 
    <template v-slot:content1>
      <div style="height: 410px; overflow-y: auto;">
        <List status="0" :data="data" />
      </div>
    </template>
    <template v-slot:content2>
      <div style="height: 410px; overflow-y: auto;">
        <List status="1" :data="data" />
      </div>
    </template>
    <template v-slot:content3>
      <div style="height: 410px; overflow-y: auto;">
        <List status="2" :data="data" />
      </div>
    </template>
  </v-tabs>
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

import List from '../list.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

</script>

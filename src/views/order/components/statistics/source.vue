<template>
  <div class="module-wrap">
    <div class="module-content plr15">
      <ChartBar :chartData="data.data" :chartOptions="data.options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore,
  watch,
  codings,
  onMounted
} from '@/utils'

import {
  ChartLine,
  ChartPie,
  ChartBar,
  
} from '@/components/packages/chart/index'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})

</script>

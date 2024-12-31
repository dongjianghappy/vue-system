<template>
  <div class="module-wrap">
    <div class="module-content plr15">
      <div>新订单: {{data.new}} 个</div>
      <div>处理中: {{data.doing}} 个</div>
      <div>已完成: {{data.completed}} 个</div>
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

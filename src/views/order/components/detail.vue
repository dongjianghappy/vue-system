<template>
<v-button v-model:show="isShow" :disabled="true">
  订单
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="订单" :style="{width: '450', height: '350'}" :data="data" :hasfooter="false" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="flex">
      <div class="col-md-4"><Management :data="data" /></div>
      <div class="col-md-4"><Detection :data="data" /></div>
      <div class="col-md-4"><Statistics /></div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
} from '@/utils'

import Management from './management/index.vue'
import Detection from './detection/index.vue'
import Statistics from './statistics/index.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  
  const isShow: any = ref(false)
</script>

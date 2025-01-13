<template>
<div class="p15 align_center relative" style="background: var(--card-background); border-radius: 8px;">
  <Checked :data="data" :render="render" v-if="data.checked" />
  <div>{{data.title}}</div>
  <div class="ptb15" style="color: #3f8600;">
    {{data.total}}
    <span :class="data.today ? 'cl-red' : 'cl-gray'">({{data.today || 0}})</span>
  </div>
  <div>昨日 {{data.yestoday || '--'}}</div>
  <span class="font12" @click="handleRouter()" style=" position: absolute; bottom: 15px; right: 10px;">
    前往
    <i class="iconfont icon-arrow" style="margin: 0 !important"></i>
  </span>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from 'vue'
import Checked from './checked.vue'
import VueEvent from '@/utils/event'
const props: any = defineProps({
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
    }
})

function handleRouter(){

}
</script>

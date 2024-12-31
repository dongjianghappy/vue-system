<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-navicon" />
</v-button>
<v-drawer v-model:show="isShow" title="" :style="{width: '200'}" :hasfooter="false">
  <template v-slot:content>
    <ul class="navigation">
      <li
        class="font16"
        @click="handleRouter(item.module)"
        v-for="(item, index) in MODUDLE"
        :key="index"
      >
        <i class="iconfont mr10" :class="`icon-${item.icon}`"></i>
        {{ item.name }}
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  codings,
  useStore
} from '@/utils'

import { MODUDLE } from "@/assets/const";

  const props: any = defineProps({
      router: {
      type: Function,
      default: () => {
        return
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  })
  
  const isShow: any = ref(false)

  function handleRouter(param: any) {
    props.router(param)
  }
</script>

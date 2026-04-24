<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-navicon" />
</v-button>
<v-drawer v-model:show="isShow" title="" :style="{width: '600'}" :hasfooter="false">
  <template v-slot:content>
    <div v-for="(item, index) in router.matcher" :key="index">
      <div class="mb15 pd10" @click="handleRouter(item.module)">
        {{item.meta.title}}
      </div>
      <!-- <div v-if="(item.children).length > 0">
        <div v-for="(list, i) in item.children" :key="i" @click="handleRouter(list.module)">asd</div>
      </div> -->
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  codings,
  useStore,
  useRouter
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
  
  const router: any = useRouter();
  const isShow: any = ref(false)

  function handleRouter(param: any) {
    props.router(param)
  }
</script>

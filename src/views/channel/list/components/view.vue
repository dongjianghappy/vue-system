<template>
<v-button v-model:show="isShow" :disabled="auth">
  详情
</v-button>
<v-view v-model:show="isShow" ref="form" title="" :style="{width: '90%', height: '90%', ispx: false}" :hasfooter="false" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="flex" style=" height: -webkit-fill-available;">
        <div style="background: #fff; flex: 1; display: flex; flex-flow: column;">
    <div class="relative" style="flex: 1; overflow: auto;">
      <div style="background: #fff; width: 100%; height: 100%;">
        <div class="p25 mb15">摘要: {{data.summary}}</div>
        <div class="p25" v-html="data.content"></div>
      </div>

    </div>
  </div>
  <div class="relative" style=" background: #f3efef; width: 350px" @click.stop>
    <Article :data="data" :wordsList="wordsList" :render="render" />
  </div>
    </div>
  </template>
</v-view>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  useProps
} from '@/utils'

import {
  REASON_TYPES,
} from '@/assets/enum'
import Article from '@/views/channel/article/components/layer/article.vue'
const props: any = defineProps(useProps)
const store = useStore()
const isShow: any = ref(false)
const detail: any = ref({})
const sourceType: any = REASON_TYPES

function submit(cancel: any) {
  const {
    reason_type,
    return_reason
  } = detail.value
  
  store.dispatch('common/Fetch', {
    api: "managementReturn",
    data: {
      reason_type,
      return_reason,
      ...props.data
    }
  }).then(res => {
    props.render()
    cancel()
  })
}
</script>

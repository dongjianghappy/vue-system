<template>
<v-layer v-model:isShow="showFlag" :data="currentData.data" :currentImg="currentData.img" v-if="showFlag" type="image" :hasInfo="currentData.hasInfo || true" :hasComment="false" />
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  computed,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'

const store = useStore();
const showFlag = ref(false)
const currentData = ref()

onMounted(() => {
  // 大图查看
  VueEvent.on("layout", (data: any) => {
    currentData.value = data
    showFlag.value = !showFlag.value
  })
})
</script>

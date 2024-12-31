<template>
<v-button v-model:show="isShow">
  <span v-html="title"></span>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" action="edit" :title="detail.title" :data="data" :param="detail" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    内容
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch
} from '@/utils'

  const props: any = defineProps({
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })
</script>

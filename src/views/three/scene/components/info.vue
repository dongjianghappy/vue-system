<template>
<v-button v-model:show="isShow" :disabled="false">
  场景内容
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="场景内容" :data="data" :hasfooter="false" :render="render">
  <template v-slot:content v-if="isShow">
    
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      isShow,
      detail,
      drawer
    }
  }
})
</script>

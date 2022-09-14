<template>
<span @click="handleclick">
  <slot></slot>
</span>
<v-dialog v-model:show="isShow" ref="form" title="图片空间" width="1200px" height="600px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <Main />
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore,
} from '@/utils'

import Main from '@/views/space/components/main/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    
    Main
  },
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
    const detail: any = ref({})
    const drawer: any = ref(null)
    const filename: any = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function submit() {

      store.dispatch('common/Fetch', {
        api: "createfile",
        data: {
          dir: props.data.dir,
          filename: filename.value,
        }
      }).then(res => {

        props.data.render("init", props.data.currentDir)
        isShow.value = !isShow.value
      })

    }

    return {
      isShow,
      handleclick,
      filename,
      detail,
      drawer,
      submit
    }
  }
})
</script>

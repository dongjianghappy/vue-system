<template>
<span @click="handleclick">
  <slot></slot>
</span>
<Dialog v-model:show="isShow" ref="form" title="图片空间" width="1200px" height="600px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <Main  type="modal" v-model:data="currentImg" />
  </template>
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore,
} from '@/utils'
import {
  Drawer
} from '@/components/packages/index'
import {
  Dialog
} from '@/components/packages/index'
import Main from './main/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog,
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
  emits: ['selectImage'],
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const filename: any = ref("")
    const currentImg: any = ref({})

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
      const data = {
        type: 'image',
        value: `![Description](${currentImg.value.img_url})`
      }
      context.emit('selectImage', data)
      // store.dispatch('common/Fetch', {
      //   api: "createfile",
      //   data: {
      //     dir: props.data.dir,
      //     filename: filename.value,
      //   }
      // }).then(res => {

      //   props.data.render("init", props.data.currentDir)
      //   isShow.value = !isShow.value
      // })

    }

    return {
      isShow,
      handleclick,
      filename,
      detail,
      drawer,
      submit,
      currentImg
    }
  }
})
</script>

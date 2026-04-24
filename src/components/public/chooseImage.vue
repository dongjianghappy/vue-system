<template>
<div class="relative">
  <img :src="image || '/images/slideshow.png'" onerror="this.src='/images/slideshow.png'" style="width: 100%; height: 120px">
  <span class="absolute" style="right: 10px; bottom: 5px" @click="handleclick">选择图片</span>
</div>
<v-dialog v-model:show="isShow" ref="form" title="图片空间" :style="{width: '1200', height: '600'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <Main type="modal" v-model:data="currentImg" />
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

import Main from '../../views/space/components/main/index.vue'
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
    },
    image: {
      type: String,
      default: ""
    }
  },
  emits: ['selectImage', 'update:image'],
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
      context.emit('update:image', currentImg.value.img_url)
      isShow.value = !isShow.value
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

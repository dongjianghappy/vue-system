<template>
<span @click="handleclick">上传图片</span>
<v-dialog v-model:show="isShow" ref="form" title="上传图片" width="600px" height="500px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <v-upload ref="upload" uploadtype='space' :data="data" :img="data.img" @imgList="image" />
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {
    
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const img: any = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function image(a: any) {
      img.value = a
    }

    function submit(){
        props.data.render("init", props.data.currentDir)
        isShow.value = !isShow.value
    }

    return {
      isShow,
      handleclick,
      detail,
      drawer,
      upload,
      image,
      submit
    }
  }
})
</script>

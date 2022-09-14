<template>
<span @click="handleclick">新建目录</span>
<v-dialog v-model:show="isShow" ref="form" title="新建目录" width="520px" height="200px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">文件夹名</span>
        <input  type="text" placeholder="请输入文件夹名" v-model="filename" class="input-sm input-full" />
      </li>
    </ul>
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

<template>
<v-button v-model:show="isShow">
  <img src="http://127.0.0.1/uploadfile/picture/thumb/00408bc7b3859365d6fdead260414ee3.jpg" style="width: 100%; height: 150px;">
</v-button>
<Video v-model:show="isShow" :data="data" ref="form" title="自定义字段" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  Video
} from '@/components/packages/index'
import {
  TEXT_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    Video
  },
  props: {
    action: {
      type: String,
      default: "add"
    },
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
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const textType = TEXT_TYPE

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function submit(cancel: any) {
      props
      debugger
      const {
        id,
        remark,
        name,
        value,
        text_type,
        explanation
      } = detail.value
      const param = {
        id,
        remark,
        name,
        value,
        text_type,
        explanation
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: 'P0000',
          ...param
        }
      }).then(res => {
        props.render()
        cancel()
      })
    }    
    
    return {
      textType,
      isShow,
      detail,
      drawer,
      submit
    }
  }
})
</script>

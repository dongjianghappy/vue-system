<template>
<v-button v-model:show="isShow">
  <i class='iconfont icon-edit'></i>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="快速编辑" width="650px" height="250px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">标题</span>
        <input type="text" v-model="data.title" placeholder="请输入参数名" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">标签</span>
        <v-tag v-model:tags="data.tag" />
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
  useStore
} from '@/utils'

import {
  TEXT_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    
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
    },
    auth: {
      type: Boolean,
      default: false
    },
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

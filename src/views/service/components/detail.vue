<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />自定义字段
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="自定义字段" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">参数名</span>
        <input type="text" placeholder="请输入参数名" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段名</span>
        <input type="text" placeholder="请输入字段名" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">参数值</span>
        <input type="text" placeholder="请输入参数值" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">文本类型</span>
        <v-select :enums="textType" v-model:value="detail.text_type" :defaultValue="detail.text_type = detail.text_type ? detail.text_type : 'input'" />
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea placeholder="请输入字段说明" v-model="data.behind_description" class="w-full"></textarea>
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
    }
  },
  setup(props, context) {
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
    
    return {
      textType,
      isShow,
      detail,
      drawer
    }
  }
})
</script>

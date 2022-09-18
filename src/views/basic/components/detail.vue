<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-anonymous-iconfont" />自定义
</v-button>
<v-dialog v-model:show="isShow" title="自定义字段" :style="{width: '520', height: '450'}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">参数名</span>
        <input type="text" v-model="detail.remark" placeholder="请输入参数名" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段名</span>
        <input type="text" v-model="detail.name" placeholder="请输入字段名" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">参数值</span>
        <input type="text" v-model="detail.value" placeholder="请输入参数值" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">文本类型</span>
        <v-select :enums="textType" v-model:value="detail.text_type" :defaultValue="detail.text_type = detail.text_type ? detail.text_type : 'input'" />
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea placeholder="请输入字段说明" v-model="detail.explanation" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore
} from '@/utils'

import {
  TEXT_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Detail',
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
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const {proxy}:any = getCurrentInstance();
    const store = useStore();
    const isShow: any = ref(false)
    const textType = TEXT_TYPE
    const detail: any = ref({})

    function submit(params: any) {
      const {
        remark,
        name,
        value,
        text_type,
        explanation
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "insert",
        data: {
          coding: 'P0000',
          remark,
          name,
          value,
          text_type,
          explanation
        }
      }).then(res => {
        props.render()
        proxy.$hlj.message({
          msg: "新增成功"
        })
        isShow.value = false
      })
    }

    return {
      textType,
      isShow,
      detail,
      submit
    }
  }
})
</script>

<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? "编辑": "新增特效"}}
  </v-button>
<v-dialog v-model:show="isShow" ref="form" :action="action" :title="action === 'edit' ? '编辑特效' : '新增特效' " width="520px" height="670px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
       <li class="li">
        <span class="label">名称</span>
        <input  type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">DOM元素</span>
        <input  type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">属性类型</span>
        <input  type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">属性名称</span>
        <input  type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">JS文件</span>
        <textarea id="description" class="ant-input"></textarea>
      </li>
      <li class="li">
        <span class="label">CSS文件</span>
        <textarea id="description" class="ant-input"></textarea>
      </li>
      <li class="li">
        <span class="label">Style属性</span>
        <textarea id="description" class="ant-input"></textarea>
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

export default defineComponent({
  name: 'v-Search',
  components: {
    
  },
  props: {
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
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

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      handleclick,
      detail,
      drawer
    }
  }
})
</script>

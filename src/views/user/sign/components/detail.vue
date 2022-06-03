<template>
<span @click="handleclick">{{action === 'edit' ? '编辑' : '新增选项'}}</span>
<Dialog v-model:show="isShow" ref="form" :title="action === 'edit' ? '编辑选项' : '新增选项'" width="520px" height="400px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">策略名称</span>
        <input  type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
       <li class="li">
        <span class="label">周期</span>
        <input  type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">积分</span>
        <input  type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
       <li class="li">
        <span class="label">积分说明</span>
        <textarea id="description" class="ant-input"></textarea>
      </li>
    </ul>
  </template>
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@/utils'
import {
  Dialog
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog
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

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      handleclick,
      detail
    }
  }
})
</script>

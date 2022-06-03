<template>
<span @click="handleclick">{{action === 'edit' ? '编辑' : '新增心情'}}</span>
<Dialog v-model:show="isShow" ref="form" :title="action === 'edit' ? '编辑角色' : '心情种类'" width="520px" height="200px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input  type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
       <li class="li">
        <span class="label">图标</span>
        <input  type="text" placeholder="请输入角色名称" class="input-sm input-full" />
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
  Drawer
} from '@/components/packages/index'
import {
  Dialog
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog
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

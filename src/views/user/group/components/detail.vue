<template>
<span @click="handleclick">{{action === 'edit' ? '编辑' : '新增等级'}}</span>
<Dialog v-model:show="isShow" ref="form" :title="action === 'edit' ? '编辑等级' : '新增等级'" width="520px" height="400px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">等级</span>
        <input  type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
       <li class="li">
        <span class="label">等级图标</span>
        <input  type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">登录天数</span>
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

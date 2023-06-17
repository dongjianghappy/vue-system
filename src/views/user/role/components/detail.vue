<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增角色'}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑角色' : '新增角色'" :data="data" :style="{width: '520', height: '200'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">角色名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'

export default defineComponent({
  name: 'v-Detail',
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
    const store: any = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const dialog: any = ref(null)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
        debugger
      }
    })

    function submit() {
      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          ...detail.value,
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      dialog,
      detail,
      submit
    }
  }
})
</script>

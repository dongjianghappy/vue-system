<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增选项"}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑选项' : '新增选项'" :data="data" :style="{width: '520', height: '320'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">能量值</span>
        <input v-model="detail.value" type="text" placeholder="请输入能量值" class="input-sm input-100" />
      </li>
      <li class="li">
        <span class="label">能量说明</span>
        <textarea v-model="detail.description" placeholder="请输入能量说明" class="w-full"></textarea>
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
    const dialog: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function submit(params: any) {

      const {
        id,
        name,
        value,
        description
      } = detail.value

      const param: any = {
        name,
        value,
        description,
        coding: props.data.coding
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          ...param,
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

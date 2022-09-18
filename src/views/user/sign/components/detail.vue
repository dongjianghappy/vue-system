<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增选项"}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑选项' : '新增选项'" :data="data" :style="{width: '520', height: '400'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">策略名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入策略名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">周期</span>
        <input v-model="detail.cycle" type="text" placeholder="请输入周期" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">积分</span>
        <input v-model="detail.integration" type="text" placeholder="请输入积分" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">积分说明</span>
        <textarea v-model="detail.explanation" placeholder="请输入积分说明" class="w-full"></textarea>
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
        cycle,
        integration,
        explanation
      } = detail.value

      const param: any = {
        name,
        cycle,
        integration,
        explanation,
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

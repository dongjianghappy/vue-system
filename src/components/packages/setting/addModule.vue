<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'add' ? '新增模块' : ''}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="data" title="新增模块" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">模块</span>
        <input type="text" v-model="detail.name" placeholder="请输入模块" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.value" placeholder="请输入字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input type="text" v-model="detail.sort" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">备注</span>
        <textarea placeholder="请输入站点介绍" v-model="detail.remark" class="w-full"></textarea>
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
  name: 'AddModule',
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
    const store = useStore()
    const isShow: any = ref(false)
    const dialog: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function submit(cancel: any) {
      const {
        name,
        value,
        sort,
        remark
      } = detail.value

      const param: any = {
        name,
        value,
        sort,
        remark
      }

      if (props.action !== "add") {
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data.coding,
          channel_id: props.data.channel_id,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      dialog,
      submit
    }
  }
})
</script>

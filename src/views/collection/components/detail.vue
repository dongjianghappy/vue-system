<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '选择节点类型'}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="选择节点类型" :data="data" :style="{width: '520', height: '300'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">采集类型</span>
        <v-select :enums="[{name: '文本', value: '0'}, {name: '图片', value: '1'}]" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '0'" />
      </li>
      <li class="li">
        <span class="label">节点名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入节点名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">节点网址</span>
        <input v-model="detail.url" type="text" placeholder="请输入节点网址" class="input-sm input-full" />
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
    },
    auth: {
      type: Boolean,
      default: false
    },
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

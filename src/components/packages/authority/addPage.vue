<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'add' ? '新增页面' : ''}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="data" title="新增页面" :style="{width: 520, height: 350}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">频道</span>
        <v-select :enums="channel" v-model:value="detail.channel_id" :defaultValue="detail.channel_id = detail.channel_id ? detail.channel_id : '1'" />
      </li>
      <li class="li">
        <span class="label">页面</span>
        <input type="text" v-model="detail.name" placeholder="请输入页面名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-radiobutton name="type" v-model:checked="detail.type" :enums="[{label: '模块', value: '0'}, {label: '链接', value: '1'}, {label: '功能', value: '2'}]"  />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.value" placeholder="请输入页面值" class="input-sm input-full" />
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
  name: 'v-Search',
  props: {
    channel: {
      type: Object,
      default: []
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
        channel_id,
        name,
        value,
        sort,
        type,
        remark
      } = detail.value

      const param: any = {
        channel_id,
        name,
        value,
        type,
        sort,
        remark
      }

      if (props.action !== "add") { //  && props.param
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data.coding,
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

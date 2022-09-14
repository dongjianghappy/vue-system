<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'add' : 'edit'}`" />{{action === 'add' ? '新增页面' : ''}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="data" title="新增页面" width="520px" height="350px" :confirm="true" :cancel="true" @submit="submit">
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
        <v-radio label="模块" name="type" value="0" v-model:checked="detail.type" />
        <v-radio label="链接" name="type" value="1" v-model:checked="detail.type" />
        <v-radio label="功能" name="type" value="2" v-model:checked="detail.type" />
      </li>
      <li class="li">
        <span class="label">页面值</span>
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
  components: {
    
  },
  props: {
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
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
          coding: 'U50002',
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
      
      submit
    }
  }
})
</script>

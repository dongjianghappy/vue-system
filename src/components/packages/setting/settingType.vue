<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'add' ? '设置类型' : ''}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="data" :title="action === 'add' ? '新增设置类型' : '编辑设置类型'" :style="{width: '520', height: '400'}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.name" placeholder="请输入页面名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.value" placeholder="请输入页面字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-select :enums="tabsSetting" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : 'switch'" />
      </li>
      <li class="li">
        <span class="label">附属</span>
        <v-select :enums="[{value: 'basic', name: '基本'}, {value: 'message', name: '消息'}, {value: 'privacy', name: '隐私'}]" v-model:value="detail.sub" :defaultValue="detail.sub = detail.sub ? detail.sub : 'message'" />
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
import {
  tabsSetting
} from '@/assets/const'
export default defineComponent({
  name: 'v-Search',
  components: {

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
        remark,
        sub,
        type
      } = detail.value

      const param: any = {
        name,
        value,
        sort,
        remark,
        sub,
        type
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
      tabsSetting,
      detail,
      dialog,
      submit
    }
  }
})
</script>

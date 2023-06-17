<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'add' ? '新增系统设置' : ''}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="data" title="新增系统设置" :style="{width: '520', height: '300'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.remark" placeholder="请输入页面名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.name" placeholder="请输入页面名称" class="input-sm input-full" />
      </li>
            <li class="li">
        <span class="label">文本类型</span>
        <v-select :enums="textType" v-model:value="detail.text_type" :defaultValue="detail.text_type = detail.text_type ? detail.text_type : 'switch'" />
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
  TEXT_TYPE,
} from '@/assets/enum'

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
    const textType = TEXT_TYPE

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function submit(cancel: any) {

      const {
        fid,
        name,
        value,
        sort,
        text_type,
        remark
      } = detail.value

      const param: any = {
        fid: fid || props.data.fid,
        name,
        value,
        sort,
        text_type,
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
      dialog,
      isShow,
      detail,
      textType,
      submit
    }
  }
})
</script>

<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="data" title="新增模块" :style="{width: 520, height: index==='2' ? 450 : 300}" @submit="submit">
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
        <span class="label">icon图标</span>
        <input type="text" v-model="detail.icon" placeholder="请输入icon图标" class="input-sm input-full" />
      </li>
      <li class="li" v-if="index === '2'">
        <span class="label">可禁言</span>
        <v-radio label="否" name="is_write" value="0" v-model:checked="detail.is_write" />
        <v-radio label="是" name="is_write" value="1" v-model:checked="detail.is_write" />
      </li>
      <li class="li" v-if="index === '2'">
        <span class="label">提示信息</span>
        <textarea placeholder="请输入信息" v-model="detail.tips" class="w-full"></textarea>
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
    index: {
      type: String,
      default: '0',
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
        name,
        value,
        is_write,
        icon,
        sort,
        tips,
        remark
      } = detail.value

      const param: any = {
        name,
        value,
        is_write,
        sort,
        icon,
        tips,
        remark
      }

      if (props.action !== "add") { //  && props.param
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          ...props.data,
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

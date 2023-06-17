<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增权限'}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :data="data" :action="action" :title="action === 'edit' ? '编辑权限' : '新增权限'" :style="{width: '520', height: '450'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input v-model="detail.value" type="text" placeholder="请输入字段或频道模块名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-radio label="频道" name="type" value="1" v-model:checked="detail.type" />
        <v-radio label="应用" name="type" value="2" v-model:checked="detail.type" />
        <v-radio label="功能" name="type" value="3" v-model:checked="detail.type" />
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea v-model="detail.description" placeholder="请输入说明" class="w-full"></textarea>
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
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const dialog: any = ref(null)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function submit(cancel: any) {
      const {
        id,
        name,
        sort,
        value,
        type,
        description
      } = detail.value
      const param = {
        id,
        name,
        sort,
        value,
        type,
        description
      }
      store.dispatch('common/Fetch', {
        api: props.action === 'add' ? "insertGrade" : 'update',
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(res => {
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

<template>
<span @click="handleclick">{{action === 'edit' ? '编辑' : '新增权限'}}</span>
<Dialog ref="dialog" v-model:show="isShow" :data="data" :action="action" :title="action === 'edit' ? '编辑权限' : '新增权限'" width="520px" height="500px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input v-model="detail.value" type="text" placeholder="请输入角色名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-radio label="频道" name="type" value="1" v-model:checked="detail.type" />
        <v-radio label="应用" name="type" value="0" v-model:checked="detail.type" />
        <v-radio label="功能" name="type" value="0" v-model:checked="detail.type" />
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea v-model="detail.description" class="ant-input"></textarea>
      </li>
    </ul>
  </template>
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'
import {
  Dialog
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog
  },
  props: {
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
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
    const detail: any = ref({})
    const dialog: any = ref(null)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function submit(cancel: any) {
      debugger
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
        cancel()
      })
    }

    return {
      isShow,
      handleclick,
      detail,
      dialog,
      submit
    }
  }
})
</script>

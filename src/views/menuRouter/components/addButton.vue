<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />新增按钮
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="新增按钮" width="520px" height="300px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">按钮</span>
        <input type="text" v-model="detail.name" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input type="text" v-model="detail.sort" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">权限</span>
        <input type="text" v-model="detail.authority" placeholder="请输入标题" class="input-sm input-full" />
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
    const drawer: any = ref(null)
    const detail: any = ref({
      name: "",
      sort: "",
      authority: ""
    })

    function submit(cancel: any) {
      const {
        name,
        sort,
        authority
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "insert",
        data: {
          name,
          sort,
          authority,
          ...props.data
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      drawer,
      submit
    }
  }
})
</script>

<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />新增按钮
</v-button>
<Dialog v-model:show="isShow" ref="form" title="新增按钮" width="520px" height="300px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">来源名称</span>
        <input type="text" v-model="detail.source_name" placeholder="请输入来源名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">来源地址</span>
        <textarea placeholder="请输入来源地址" v-model="detail.source_url" class="w-full"></textarea>
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
  Drawer
} from '@/components/packages/index'
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
    const drawer: any = ref(null)
    const detail: any = ref({
      name: "",
      sort: "",
      authority: ""
    })

    function submit(cancel: any) {
      const {
        source_name,
        source_url
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "insert",
        data: {
          coding: "O0017",
          channel_id: props.data.channel_id,
          source_name,
          source_url
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

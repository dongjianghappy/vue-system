<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增标签'}}</v-button>
<v-dialog v-model:show="isShow" ref="dialog" :action="action" :title="action === 'edit' ? '编辑标签' : '新增标签'" :data="data" width="520px" height="200px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">频道</span>
        <v-select :enums="channelMenu" v-model:value="detail.channel_id" :defaultValue="detail.channel_id = detail.channel_id ? detail.channel_id : '1'" />
      </li>
      <li class="li">
        <span class="label">标签名</span>
        <input type="text" v-model="detail.name" placeholder="请输入标签名" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">属性类型</span>
        <v-radio label="核心词" name="type" value="1" v-model:checked="detail.type" />
        <v-radio label="目标词" name="type" value="2" v-model:checked="detail.type" />
        <v-radio label="长尾词" name="type" value="0" v-model:checked="detail.type" />
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  useStore
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
    const store = useStore();
    const isShow: any = ref(false)
    const dialog: any = ref(null)
    const detail: any = ref({})
    const channelMenu: any = ref([])
    const channel: any = computed(() => store.getters['user/channel']);

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
        detail.value = await dialog.value.init()
      }
    })

    function init() {
      debugger
      channel.value.map((item: any) => {
        channelMenu.value.push({
          value: item.id,
          name: item.name
        })
      })
    }

    function submit(cancel: any) {
      const {
        name,
        channel_id,
        type,
      } = detail.value

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          name,
          channel_id,
          type,
          ...props.data
        }
      }).then(() => {
        // props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      dialog,
      channelMenu,
      submit

    }
  }
})
</script>

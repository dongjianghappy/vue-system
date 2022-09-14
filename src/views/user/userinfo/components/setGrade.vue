<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont icon-write" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="新增按钮" width="520px" height="200px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li>
        <v-radio label="访客" name="grade" value="0" v-model:checked="detail.grade" />
        <v-radio label="普通用户" name="grade" value="1" v-model:checked="detail.grade" />
        <v-radio label="高级用户" name="grade" value="2" v-model:checked="detail.grade" />
        <v-radio label="VIP用户" name="grade" value="3" v-model:checked="detail.grade" />
        <v-radio label="超级VIP" name="grade" value="4" v-model:checked="detail.grade" />
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

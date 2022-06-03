<template>
<v-button v-model:show="isShow" :disabled="auth">
  退回
</v-button>
<Dialog v-model:show="isShow" ref="form" title="审核退回" width="520px" height="300px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">退回类型</span>
        <v-select :enums="sourceType" v-model:value="detail.reason_type" :defaultValue="detail.reason_type = detail.reason_type ? detail.reason_type : '0'" />
      </li>
      <li class="li">
        <span class="label">退回原因</span>
        <textarea placeholder="请输入站点介绍" v-model="detail.return_reason" class="w-full"></textarea>
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
import {
  REASON_TYPES,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog
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
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const sourceType: any = REASON_TYPES

   function submit(cancel: any) {
      const {
        reason_type,
        return_reason
      } = detail.value
      const param = {

      }

      store.dispatch('common/Fetch', {
        api: "managementReturn",
        data: {
          reason_type,
          return_reason,
          ...props.data
        }
      }).then(res => {
        props.render()
        cancel()
      })
    }

    return {
      isShow,
      detail,
      drawer,
      sourceType,
      submit
    }
  }
})
</script>

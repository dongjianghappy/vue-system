<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont icon-write" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="设置用户状态" width="520px" height="350px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">状态</span>
        <v-radio label="正常" name="status" value="0" v-model:checked="detail.status" />
        <v-radio label="禁言" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="封号" name="status" value="2" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">违禁天数</span>
        <v-select :enums="bannedDay" v-model:value="detail.banuser_day" :disabled="detail.status === '0'" />
      </li>
      <li class="li">
        <span class="label">违禁原因</span>
        <textarea placeholder="请输入站点介绍" v-model="detail.banuser_reason" class="w-full" :disabled="detail.status === '0'"></textarea>
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
  BANNED_DAY,
} from '@/assets/enum'

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
    const bannedDay: any = BANNED_DAY
    const detail: any = ref({
      status: 0,
      banuser_day: "",
      banuser_reason: ""
    })


    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value.status = props.data.status
        if(props.data.status !== '0'){
          detail.value.banuser_day = props.data.banuser_day
          detail.value.banuser_reason = props.data.banuser_reason
        }
      }
    })

    // 监听
    watch([status], async (newValues, prevValues) => {
      if (isShow.value) {
        
      }
    })


    function submit(cancel: any) {
      const {
        status,
        banuser_day,
        banuser_reason
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "violationSetting",
        data: {
          uid: props.data.account,
          status: status,
          banuser_day,
          banuser_reason
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      drawer,
      submit,
      bannedDay,
      detail
    }
  }
})
</script>

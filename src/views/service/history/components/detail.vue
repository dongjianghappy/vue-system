<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增历程"}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑历程' : '新增历程'" :data="data" :style="{width: '650', height: '300'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">时间</span>
        <v-birthday :data="{year: detail.year, month: detail.month, day: detail.day}" @choose="chooseBirthday" />
      </li>
      <li class="li">
        <span class="label">历程</span>
        <textarea v-model="detail.title" placeholder="请输入内容" />
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
    const store: any = useStore()
    const isShow: any = ref(false)
    const dialog: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function chooseBirthday(param: any) {
      detail.value.year = param.year
      detail.value.month = param.month
      detail.value.day = param.day
    }

    function submit(params: any) {

      const {
        id,
        title,
        year,
        month,
        day,
      } = detail.value

      const param: any = {
        title,
        time: `${year}-${month}-${day}`,
        coding: props.data.coding
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          ...param,
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      dialog,
      detail,
      chooseBirthday,
      submit
    }
  }
})
</script>

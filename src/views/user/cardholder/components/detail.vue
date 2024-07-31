<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增选项"}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑选项' : '新增选项'" :data="data" :style="{width: '520', height: '600'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入策略名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-radiobutton name="type" v-model:checked="detail.type" :enums="[{label: '优惠卷', value: '0'}, {label: '会员卡', value: '1'}, {label: '纪念卡', value: '2'}]" />
      </li>
      <li class="li">
        <span class="label">图标</span>
        <input v-model="detail.icon" type="text" placeholder="请输入图标" class="input-sm input-100" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input v-model="detail.value" type="text" placeholder="请输入字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">周期</span>
        <input v-model="detail.cycle" type="text" placeholder="请输入周期" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">金币</span>
        <input v-model="detail.goldcoin" type="text" placeholder="请输入金币" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">表达式</span>
        <textarea v-model="detail.expression" placeholder="请输入表达式" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">金币说明</span>
        <textarea v-model="detail.explanation" placeholder="请输入金币说明" class="w-full"></textarea>
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

    function submit(params: any) {

      const {
        id,
        name,
        icon,
        type,
        value,
        cycle,
        expression,
        goldcoin,
        explanation
      } = detail.value

      const param: any = {
        name,
        value,
        icon,
        type,
        cycle,
        expression,
        goldcoin,
        explanation,
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
      submit
    }
  }
})
</script>

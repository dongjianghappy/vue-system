<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增字段"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑字段' : '新增字段' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">注释</span>
        <input v-model="detail.remark" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段名</span>
        <input v-model="detail.fields" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">数据类型</span>
        <v-radio label="文本保存HTML数据(TEXT)" name="dtype" value="TEXT" v-model:checked="detail.dtype" />
        <v-radio label="字符串类型(VARCHAR)" name="dtype" value="VARCHAR" v-model:checked="detail.dtype" />
        <v-radio label="整数类型(INT)" name="dtype" value="int" v-model:checked="detail.dtype" />
        <v-radio label="小数类型(Float)" name="dtype" value="float" v-model:checked="detail.dtype" />
        <v-radio label="时间类型(DATETIME)" name="dtype" value="datetime" v-model:checked="detail.dtype" />
      </li>
      <li class="li">
        <span class="label">显示类型</span>
        <v-select :enums="textType" v-model:value="detail.text_type" :defaultValue="detail.text_type = detail.text_type ? detail.text_type : 'input'" />
      </li>
      <li class="li">
        <span class="label">长度</span>
        <input v-model="detail.max_length" type="text" placeholder="请输入标题" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea placeholder="描述后缀" v-model="detail.explanation" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'
import {
  TEXT_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'Detail',
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
    }
  },
  setup(props, context) {
    const store = useStore()
    const textType = TEXT_TYPE
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

   function submit(params: any) {
      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update_anpassen' : 'add_anpassen',
        data: {
          coding: props.data.coding,
          channel_id: props.data.channel_id,
          ...detail.value,
        }
      }).then(() => {
        props.render()
        params.message()
        params.cancel()
      })
    }    

    return {
      textType,
      isShow,
      drawer,
      detail,
      submit
    }
  }
})
</script>

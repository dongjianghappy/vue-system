<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'add' ? '新增模块' : ''}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="{...data, coding}" title="新增页面" :style="{width: 520, height: 350}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">站点</span>
        <v-select :enums="website" v-model:value="detail.website_id" :defaultValue="detail.website_id = detail.website_id ? detail.website_id : '1'" />
      </li>
      <li class="li">
        <span class="label">页面</span>
        <input type="text" v-model="detail.name" placeholder="请输入页面名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-radiobutton name="type" v-model:checked="detail.type" :enums="[{label: '模块', value: '0'}, {label: '链接', value: '1'}]"  />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.value" placeholder="请输入字段值" class="input-sm input-full" />
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  codings,
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  props: {
    website: {
      type: Object,
      default: []
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
    const dialog: any = ref(null)
    const detail: any = ref({})
    const coding = codings.channel_config

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function submit(cancel: any) {
      const {
        website_id,
        channel_id,
        name,
        value,
        sort,
        type,
        remark
      } = detail.value

      const param: any = {
        website_id,
        channel_id,
        name,
        value,
        type,
        sort,
        remark
      }

      if (props.action !== "add") { //  && props.param
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: coding,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      coding,
      isShow,
      detail,
      dialog,
      submit
    }
  }
})
</script>

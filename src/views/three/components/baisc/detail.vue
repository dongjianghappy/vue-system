<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="设置" :style="{width: '350'}" :data="data" :param="detail" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.remark" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input type="text" v-model="detail.name" placeholder="请输入字段" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">值</span>
        <input type="text" v-model="detail.value" placeholder="请输入值" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">单位</span>
        <input type="text" v-model="detail.unit" placeholder="请输入单位" class="input-sm input-full" />
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
  tabsSetting
} from '@/assets/const'
export default defineComponent({
  name: 'v-Search',
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
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function submit(cancel: any) {
      const {
        fid,
        name,
        value,
        unit,
        remark
      } = detail.value

      const param: any = {
        fid: fid || props.data.fid,
        name,
        value,
        unit,
        remark
      }

      if (props.action !== "add") {
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      tabsSetting,
      detail,
      drawer,
      submit
    }
  }
})
</script>

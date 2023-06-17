<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "创建收藏夹"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑收藏夹' : '创建收藏夹' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.name" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">链接</span>
        <input type="text" v-model="detail.url" placeholder="请输入链接地址" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">状态</span>
        <v-radio label="显示" name="checked" value="1" v-model:checked="detail.checked" />
        <v-radio label="关闭" name="checked" value="0" v-model:checked="detail.checked" />
      </li>
      <li class="li">
        <span class="label">收藏夹</span>
        <v-select :enums="favorites" v-model:value="detail.fid" :defaultValue="detail.fid = detail.fid ? detail.fid : '5'" />
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@/utils'
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
    },
    auth: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      isShow,
      detail,
      drawer
    }
  }
})
</script>

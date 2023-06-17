<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增标签'}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :data="data" title="新增标签" :style="{width: '520', height: '500'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">备注</span>
        <input v-model="detail.remark" type="text" placeholder="请输入备注" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">标签值</span>
        <input v-model="detail.value" type="text" placeholder="请输入标签值" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-select :enums="sourceType" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : 'nav'" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">tag值</span>
        <input v-model="detail.tag" type="text" placeholder="请输入tag值" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">图标</span>
        <input v-model="detail.icon" type="text" placeholder="请输入图标" class="input-sm input-150 mr15" />
        <v-popover content="选择图标" arrow="tb" offset="right" :move="-20" :keys="`static_${index}`">
          <div style="display: flex; flex-wrap: wrap; padding: 16px;">
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-home" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-shezhi" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-list" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-article" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-like" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-comment" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-star" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-download" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-recycle" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-slideshow" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-app" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-gather" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-mysql" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-moxing" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-route" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-dot" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-email" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-order" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-user" style="color: rgb(153, 153, 153);"></i></span>
          </div>
        </v-popover>
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch
} from '@/utils'
import {
  LABEL_TYPE,
} from '@/assets/enum'
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
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const dialog: any = ref(null)
    const sourceType: any = LABEL_TYPE

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    return {
      isShow,
      detail,
      dialog,
      sourceType
    }
  }
})
</script>

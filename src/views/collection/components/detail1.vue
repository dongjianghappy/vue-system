<template>
<v-button v-model:show="isShow" :disabled="auth">
  开始采集
</v-button>
<v-dialog v-model:show="isShow" title="开始采集" :style="{width: '650', height: '750'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <h3 class="mb25">节点名称</h3>
    <div class="alert-description ptb10 plr15 font12">
      <p>1、采集网址必须为完整URL地址</p>
      <p>2、开始区域和结束区域必须为采集页面唯一一个html代码标识</p>
      <p>3、采集对象必须放置在双引号里，内容用'(.*)'表示例: </p>
      <p>4、字段和(.*)对应，并以逗号分开，有效匹配字段title、url、image，无效匹配字段invalid</p>
    </div>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">采集地址</span>
        <input type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">HTML开始</span>
        <textarea placeholder="infinite_scroll" id="areastart" class="ant-input"></textarea>
      </li>
      <li class="li">
        <span class="label">HTML结束</span>
        <textarea placeholder="page" id="areaend" class="ant-input"></textarea>
      </li>
      <li class="li">
        <span class="label">采集HTML</span>
        <textarea placeholder="正则: <a href='(.*)' target='_blank'><img alt='(.*)' src='(.*)' /></a>" id="obje" class="ant-input"></textarea>
      </li>
      <li class="li">
        <span class="label">字段</span>
        <textarea placeholder="title,url,image,invalid" id="field" class="ant-input"></textarea>
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@/utils'

export default defineComponent({
  name: 'v-Detail1',
  props: {
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
    const isShow: any = ref(false)
    const detail: any = ref({})

    return {
      isShow,
      detail
    }
  }
})
</script>

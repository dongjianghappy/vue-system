<template>
<v-button v-model:show="isShow" :disabled="auth">
开始采集
</v-button>
<Dialog v-model:show="isShow" ref="form" title="开始采集" width="650px" height="800px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <h3 class="mb25">节点名称: 张文钦</h3>
    <div data-show="true" class="ant-alert ant-alert-info ant-alert-with-description"><span role="img" aria-label="info-circle" class="anticon anticon-info-circle ant-alert-icon"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
          <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path>
        </svg></span><span class="ant-alert-message"></span><span class="ant-alert-description">
        <p>1、采集网址必须为完整URL地址</p>
        <p>2、开始区域和结束区域必须为采集页面唯一一个html代码标识</p>
        <p>3、采集对象必须放置在双引号里，内容用'(.*)'表示例: </p>
        <p>4、字段和(.*)对应，并以逗号分开，有效匹配字段title、url、image，无效匹配字段invalid</p>
      </span></div>
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
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@/utils'
import {
  Dialog
} from '@/components/packages/index'
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
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)

    // 监听
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

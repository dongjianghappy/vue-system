<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-anonymous-iconfont" />信息配置
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="信息配置" :data="data" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">参数名</span>
        <input type="text" v-model="detail.remark" placeholder="请输入参数名" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段名</span>
        <input type="text" v-model="detail.name" placeholder="请输入字段名" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">参数值</span>
        <input type="text" v-model="detail.value" placeholder="请输入参数值" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">文本类型</span>
        <v-select :enums="TEXT_TYPE" v-model:value="detail.text_type" :defaultValue="detail.text_type = detail.text_type ? detail.text_type : 'input'" />
      </li>
      <li class="li">
        <span class="label">说明</span>
        <textarea placeholder="请输入字段说明" v-model="detail.explanation" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">可删除</span>
        <v-radio label="是" name="isdelete" value="0" v-model:checked="detail.isdelete" />
        <v-radio label="否" name="isdelete" value="1" v-model:checked="detail.isdelete" />
      </li>
      <li class="li">
        <span class="label">展示站点</span>
        <span class="mr15">{{detail.website_name}}</span>
        <v-choose :data="{item: detail, coding: coding.site.list, condition: {status: 1}}" v-model:checked="detail.website" type="radio" @choose="choose" />
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  codings,
  defineComponent,
  getCurrentInstance,
  ref,
  useStore
} from '@/utils'

import {
  TEXT_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'Detail',
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
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding = codings
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})

    function submit(params: any) {
      const {
        remark,
        name,
        value,
        text_type,
        explanation,
        isdelete,
        website
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "insert",
        data: {
          coding: props.data.coding,
          remark,
          name,
          value,
          text_type,
          explanation,
          isdelete,
          website
        }
      }).then(res => {
        props.render()
        proxy.$hlj.message({
          msg: "新增成功"
        })
        isShow.value = false
      })
    }

    function choose(param: any) {
      const {
        data
      } = param
      detail.value.website = data.id
      detail.value.website_name = data.name
    }

    return {
      coding,
      TEXT_TYPE,
      isShow,
      detail,
      submit,
      choose
    }
  }
})
</script>

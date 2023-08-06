<template>
<div class="module-wrap">
  <div class="module-head">
    展示设置
    <span class="right">
      <AddSetting action="add" :data="{coding: data.coding}" :menu="menus" :render="render" /></span>
  </div>
  <div class="module-content p15">
    <ul class="form-wrap-box">
      <template v-for="(item, index) in data.setting" :key="index">
        <li class="li mb15" v-if="item.text_type === 'switch'">
          <span class="label">
            {{item.remark}}
          </span>
          <v-switch :data="{ item, field: 'value', coding: data.coding }" className="right" :auth="true" />
        </li>
      </template>
    </ul>
  </div>
</div>
<div class="module-wrap">
  <div class="module-head">
    搜索设置
    <span class="right pointer" @click="submit">保存</span>
  </div>
  <div class="module-content p15">
    <ul class="form-wrap-box">
      <template v-for="(item, index) in data.setting" :key="index">
        <li class="vertical" v-if="item.text_type != 'switch'">
          <div class="label">{{item.remark}}</div>
          <input type="text" v-model="form[item.name]" class="input-sm input-full" v-if="item.text_type === 'input'">
          <v-checkboxgroup :tagList="menus[item.name]" :checked="form[item.name]" v-else-if="item.text_type === 'checkbox'" />
          <v-select :enums="menus[item.name]" v-model:value="form[item.name]" :defaultValue="form[item.name] = form[item.name] ? form[item.name] : 'all'" v-else-if="item.text_type === 'select'" />
        </li>
      </template>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import AddSetting from "@/views/search/components/addSetting.vue"
import {
  defineComponent,
  useStore,
  watch,
  ref
} from '@/utils'

export default defineComponent({
  name: 'v-Keyword',
  components: {
    AddSetting
  },
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
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const form: any = ref({
      pagesize: ''
    })

    const menus = {
      field: [{
          name: 'source',
          value: '标题',
          tag: 'title'
        },
        {
          name: 'tech',
          value: '描述',
          tag: 'description'
        },
        {
          name: 'article',
          value: '内容',
          tag: 'content'
        }
      ],
      channel: [{
          name: 'source',
          value: '素材',
          tag: 'source'
        },
        {
          name: 'tech',
          value: '技术',
          tag: 'tech'
        },
        {
          name: 'article',
          value: '资讯',
          tag: 'article'
        },
        {
          name: 'notes',
          value: '笔记',
          tag: 'notes'
        },
        {
          name: 'blog',
          value: '博客',
          tag: 'blog'
        }
      ],
      condition: [{
        name: 'source',
        value: '审核通过',
        tag: 'checked'
      }],
      time: [{
          value: 'all',
          name: '全部时间',
        },
        {
          value: 'day',
          name: '最近一天',
        },
        {
          value: 'week',
          name: '最近一周',
        },
        {
          value: 'month',
          name: '最近一月',
        },
        {
          value: 'year',
          name: '最近一年',
        }
      ],
    }

    // 监听
    watch(props, async (newValues, prevValues) => {
      props.data.setting.map((item: any) => {
        if (item.text_type != 'switch') {
          if (item.text_type === 'checkbox') {
            form.value[item.name] = item.value ? item.value.split("|") : []
          } else {

            form.value[item.name] = item.value
          }
        }
      })

    })

    // 保存
    function submit(params: any) {
      const param: any = {}
      for (let key in form.value) {
        if (form.value[key] instanceof Array) {
          param[key] = form.value[key].length > 0 ? `|${form.value[key].join("|")}|` : ""
        } else {
          param[key] = form.value[key]
        }
      }

      store.dispatch('common/Fetch', {
        api: 'updateInfo',
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(res => {
        props.render()
      })
    }

    return {
      menus,
      form,
      submit
    }
  }
})
</script>

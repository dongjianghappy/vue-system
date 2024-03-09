<template>
<v-button v-model:show="isShow" :disabled="auth">
  设置
</v-button>
<v-drawer v-model:show="isShow" title="查询设置" :style="{width: '400'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    <AddSetting action="add" :data="{coding}" />
  </template>
  <template v-slot:content>
    <div class="module-wrap">
      <div class="module-head">
        开关状态
      </div>
      <div class="module-content p15">
        <ul class="form-wrap-box">
          <template v-for="(item, index) in dataList" :key="index">
            <li class="li mb15" v-if="item.text_type === 'switch'">
              <span class="label">
                {{item.remark}}
              </span>
              <v-switch :data="{ item, field: 'value', coding }" @toggle="getValue" className="right" :auth="true" />
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="module-wrap">
      <div class="module-head">
        查询条件
        <span class="right pointer" @click="submit">保存</span>
      </div>
      <div class="module-content p15">
        <ul class="form-wrap-box">
          <template v-for="(item, index) in dataList" :key="index">
            <li class="li" v-if="item.text_type != 'switch'">
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
</v-drawer>
</template>

<script lang="ts">
import {
  useStore
} from '@/utils'
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  computed,
  codings
} from '@/utils'
import SettingType from './settingType.vue'
import AddSetting from '../../../views/search/components/addSetting.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    SettingType,
    AddSetting
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore()
    const coding = codings.search.setting
    const isShow: any = ref(false)
    const dataList: any = ref([])
    const setting = computed(() => store.getters['user/setting']);
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
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "selectSetting"
      }).then(res => {
        dataList.value = res.result
      })
    }

    function getValue(param: any) {
      store.commit('user/setSettingValue', {
        ...param
      })
    }

    return {
      isShow,
      coding,
      dataList,
      setting,
      module,
      init,
      getValue,
      form,
      menus
    }
  }
})
</script>

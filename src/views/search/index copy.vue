<template>
<div class="mb10 col-md-10" style="overflow: auto;">
  <div class="mb10" style="overflow: auto;">
    <div class="col-md-3" style="padding-right: 8px;">
      <div class="col-md-6">
        <v-statisticcard name="累计搜素111" :value="data.search_total || 0" />
      </div>
      <div class="col-md-6">
        <v-statisticcard name="关键词总量" :value="data.word_total || 0" />
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
      <div class="col-md-6">
        <v-statisticcard name="昨日搜索量" :value="data.yes_search && data.yes_search.search || 0" />
      </div>
      <div class="col-md-6">
        <v-statisticcard name="昨日搜索词" :value="data.yes_search && data.yes_search.word || 0" />
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
      <div class="col-md-6">
        <v-statisticcard name="今日搜索量" :value="data.today_search && data.today_search.search || 0" />
      </div>
      <div class="col-md-6">
        <v-statisticcard name="今日搜索词" :value="data.today_search && data.today_search.word || 0" />
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px;">
      <div class="col-md-6">
        <v-statisticcard name="昨日用户" :value="data.yes_search && data.yes_search.user || 0" />
      </div>
      <div class="col-md-6">
        <v-statisticcard name="今日用户" :value="data.today_search && data.today_search.user || 0" />
      </div>
    </div>
  </div>
  <div class="mb10" style="overflow: auto;">
    <div class="col-md-9" style=" padding-right: 8px;">
      <div class="module-wrap m0">
        <div class="module-head">搜素概况</div>
        <div class="module-content plr15" style="height: 370px">
          <List :data="data.body" />
        </div>
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px;">
      <div class="module-wrap m0">
        <div class="module-head">关键词</div>
        <div class="module-content p0" style="height: 370px">
          <ul>
            <li class="item-thum-wrap mb10" v-for="(item, index) in data.wordList" :key="index">
              <div class="item-title relative">
                <i class="iconfont icon-dot m0" />
                {{item.word}}
              </div>
            </li>
          </ul>
          <!-- <ChartLine :chartData="register.data" :chartOptions="register.options" /> -->
        </div>
      </div>
    </div>
  </div>
  <div class="mb10" style="overflow: auto;">
    <div class="col-md-4" style=" padding-right: 8px;">
      <div class="module-wrap">
        <div class="module-head">
          搜索热榜
        </div>
        <div class="module-content plr15" style="height: 336px">
          <ul>
            <li class="item-thum-wrap mb10" v-for="(item, index) in data.hot" :key="index">
              <div class="item-title relative pl40 pr40">
                <i class="iconfont icon-top num m0" v-if="index === 0" />
                <span class="num" v-else>{{index}}</span>
                {{item.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-5" style="padding-left: 8px; padding-right: 8px;">
      <div class="module-wrap">
        <div class="module-head">
          搜索发现
          <span class="right">
            <v-refresh :render="refresh" /></span>
        </div>
        <div class="module-content plr15" style="height: 336px">
          <ul>
            <li class="item-thum-wrap mb10" v-for="(item, index) in findList[current]" :key="index">
              <div class="item-title relative pl40 pr40">
                <i class="iconfont icon-top num m0" v-if="index === 0" />
                <span class="num" v-else>{{index}}</span>
                {{item.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px;">
      <div class="module-wrap">
        <div class="module-head">
          用户
        </div>
        <div class="module-content plr15" style="height: 336px">
          <ul>
            <li class="item-thum-wrap mb10" v-for="(item, index) in findList[current]" :key="index">
              <div class="item-title relative pl40 pr40">
                <i class="iconfont icon-top num m0" v-if="index === 0" />
                <span class="num" v-else>{{index}}</span>
                {{item.name}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="col-md-2" style="overflow: auto;">

  <div style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        展示设置
        <span class="right">
          <AddSetting action="add" /></span>
      </div>
      <div class="module-content p15">
        <ul class="form-wrap-box">
          <template v-for="(item, index) in data.setting" :key="index">
            <li class="li mb15" v-if="item.text_type === 'switch'">
              <span class="label">
                {{item.remark}}
              </span>
              <v-switch :data="{ item, field: 'value', coding: 'P0017' }" @toggle="getValue" className="right" :auth="true" />
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="module-wrap">
      <div class="module-head">
        搜索设置
        {{form}}
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
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  useRoute,
  watch,
  codings
} from '@/utils'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import AddSetting from "./components/addSetting.vue"
import {
  ChartLine
} from '@/components/packages/chart/index'
import Authority from '@/components/packages/authority/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChartLine,
    Authority,
    List,
    List2,
    AddSetting
  },
  setup(props, context) {
    const coding: any = codings
    const store = useStore();
    const route = useRoute();
    const menu: any = ref([{
        name: "搜索概况",
        value: "advertisement1"
      },
      {
        name: "图表查看",
        value: "advertisement2"
      },
      {
        name: "日期查看",
        value: "advertisement3"
      }
    ])

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

    const data: any = computed(() => store.getters['basic/searchDefault'] || {});
    const findList = computed(() => store.getters['basic/searchDefault'].find || []);
    const form: any = ref({
      pagesize: ''
    })

    let current: any = ref(0)

    // 监听
    watch(data, async (newValues, prevValues) => {
      data.value.setting.map((item: any) => {
        debugger
        if (item.text_type != 'switch') {
          if (item.text_type === 'checkbox') {
            form.value[item.name] = item.value ? item.value.split("|") : []
          } else {

            form.value[item.name] = item.value
          }
        }
      })

    })

    function refresh() {
      debugger
      if (current.value === 4 || current.value === data.value.find.length - 1) {
        current.value = 0
      } else {
        current.value++
      }
    }

    // 初始化
    function init() {
      if (route.path.indexOf("talk") !== -1) {
        store.dispatch('talk/searchDefault')
      } else {
        store.dispatch('basic/searchDefault')
      }
    }

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
          coding: "P0017",
          ...param
        }
      }).then(res => {
        debugger
      })
    }

    onMounted(init)

    return {
      data,
      menu,
      refresh,
      findList,
      current,
      menus,
      form,
      submit
    }
  }
})
</script>

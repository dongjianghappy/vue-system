<template>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-3" style="padding-right: 8px;">
    <div class="col-md-6">
      <v-statisticcard name="累计搜素" :value="data.search_total || 0" />
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
    <List :data="data.body" />
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
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  useStore,
  useRoute,
  codings
} from '@/utils'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
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
    List2
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

    const data: any = computed(() => store.getters['basic/searchDefault'] || {});
    const findList = computed(() => store.getters['basic/searchDefault'].find || []);

    let current: any = ref(0)

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

    onMounted(init)

    return {
      data,
      menu,
      refresh,
      findList,
      current
    }
  }
})
</script>

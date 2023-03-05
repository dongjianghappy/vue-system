<template>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-3" style="padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="用户总量" :value="user.total || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日注册" :value="user.yesterday || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日注册" :value="user.today || 0" />
    </div>
  </div>
  <!-- <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
    <v-statisticcard name="业绩" value="2,836" />
  </div>
  <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
    <v-statisticcard name="消息" value="2,836" />
  </div> -->
<div class="col-md-3" style="padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="累计览量" :value="statistics.total_visit || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日览量" :value="statistics.yesterday && statistics.yesterday.pv || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日览量" :value="statistics.today && statistics.today.pv || 0" />
    </div>
  </div>
  <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="累计IP" :value="statistics.total_ip || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日IP" :value="statistics.yesterday && statistics.yesterday.ip || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日IP" :value="statistics.today && statistics.today.ip || 0" />
    </div>
  </div>

  
  <div class="col-md-3" style="padding-left: 8px;">
    <div class="col-md-6">
      <v-statisticcard name="网站浏览" :value="website_sucai.visit || 0" />
    </div>
    <div class="col-md-6">
      <v-statisticcard name="博客浏览" :value="website_blog.visit || 0" />
    </div>
  </div>
</div>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-9" style=" padding-right: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        今日与昨日访问量
      </div>
      <div class="module-content  plr15" style="height: 545px">
        <ChartLine :chartData="hours.data" :chartOptions="hours.options" />
      </div>
    </div>
  </div>
  <div class="col-md-3" style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-content plr15" style="height: 320px">
        <ChartPie :chartData="engine.data" :chartOptions="engine.options" />
        <!-- <ChartLine :chartData="visit.data" :chartOptions="visit.options" /> -->
      </div>
    </div>
    <div class="module-wrap">
      <div class="module-content p0" style="height: 260px">
        <ChartLine :chartData="register.data" :chartOptions="register.options" />
      </div>
    </div>
  </div>
</div>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-6" style=" padding-right: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        网页素材
      </div>
      <div class="module-content plr15" style="height: 320px">
        <ul>
          <li class="item-thum-wrap mb10" v-for="(item, index) in article" :key="index">
            <div class="item-title relative pl40 pr40"><span class="num">{{index+1}}</span>{{item.title}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-6" style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        IT技术
      </div>
      <div class="module-content plr15" style="height: 320px">
        <ul>
          <li class="item-thum-wrap mb10" v-for="(item, index) in tech" :key="index">
            <div class="item-title relative pl40 pr40"><span class="num">{{index+1}}</span>{{item.title}}</div>
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
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore
} from '@/utils'
import {
  ChartLine,
  ChartPie
} from '@/components/packages/chart/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChartLine,
    ChartPie
  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();

    const user: any = computed(() => store.getters['basic/default'].user || {});
    const statistics: any = computed(() => store.getters['basic/default'].statistics || {});
    const website_sucai: any = computed(() => store.getters['basic/default'].website_sucai || {});
    const website_blog: any = computed(() => store.getters['basic/default'].website_blog || {});
    const hours: any = computed(() => {
      let aaa = store.getters['basic/default'].hours || {}
      debugger
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.today_online) || []],
            [...(aaa.value && aaa.value.today_visit) || []],
            // [...(aaa.value && aaa.value.yestday_online) || []],
            // [...(aaa.value && aaa.value.yestday_visit) || []]
          ]
          // "series": [
          //   [0, 23, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0],
          //   [0, 0, 0, 45, 0, 0, 0, 0, 0, 34, 2, 0, 0, 0],
          //   [0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          //   [0, 12, 0, 0, 0, 0, 0, 54, 0, 0, 0, 98, 0, 0]
          // ]
        },
        options: {
          // title: ["今日浏览量", "今日在线", "昨日浏览量", "昨日在线"],
          title: ["今日浏览量", "昨日浏览量"],
          height: 400
        }
      }

    });

    const visit: any = computed(() => {
      let aaa = store.getters['basic/default'].week || {}
      debugger
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.visit) || []]
          ]
        },
        options: {
          background: "#5ab25e",
          title: ["今日与昨日访问量"],
          height: 200
        }
      }
    });

    // 搜索引擎
    const engine: any = computed(() => {
      let aaa = store.getters['basic/default'].engine || {}
      return {
        data: {
          labels: aaa.labels, //['谷歌', '百度', '搜狗', "360", "必应", "头条"],
          series: aaa.series // [20, 15, 40, 12, 232, 32]
        },
        options: {
          background: "#5ab25e",
          title: ["今日搜索"],
          height: 200
        }
      }
    });    

    const register: any = computed(() => {
      let aaa = store.getters['basic/default'].week || {}
      debugger
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.register) || []]
          ]
        },
        options: {
          background: "#e12d6c",
          title: ["一周注册量"],
          height: 200
        }
      }
    });

    const tech: any = computed(() => store.getters['basic/default'].tech || []);
    const article: any = computed(() => store.getters['basic/default'].article || []);
    // const order: any = computed(() => store.getters['basic/default'].order);
    // 初始化
    function init() {
      store.dispatch('basic/Default')
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(init)
    return {
      user,
      statistics,
      website_sucai,
      website_blog,
      // order,
      hours,
      visit,
      engine,
      register,
      tech,
      article,
      handleclick
    }
  }
})
</script>

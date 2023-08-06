<template>
<div class="mb10" style="overflow: auto;">
  <Card :data="visit" />
</div>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-9" style=" padding-right: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        今日与昨日访问量
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ChartLine :chartData="hours.data" :chartOptions="hours.options" />
      </div>
    </div>
  </div>
  <div class="col-md-3" style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-content plr15" style="height: 320px">
        <ChartPie :chartData="engine.data" :chartOptions="engine.options" />
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
  <div class="col-md-5" style=" padding-right: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        近7天数据量统计
      </div>
      <div class="module-content plr15" style="height: 320px">
        <ChartLine :chartData="weekVisit.data" :chartOptions="weekVisit.options" />
      </div>
    </div>
  </div>
  <div class="col-md-7" style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        本月数据量统计
      </div>
      <div class="module-content plr15" style="height: 320px">
        <ChartLine :chartData="weekIp.data" :chartOptions="weekIp.options" />
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
import Card from "./components/card.vue"
export default defineComponent({
  name: 'v-Search',
  components: {
    Card,
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

    const visit: any = computed(() => store.getters['talk/defaultStatistics'].visit || {});
    const hours: any = computed(() => {
      let aaa = store.getters['talk/defaultStatistics'].hours || {}
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.today_visit) || []],
            [...(aaa.value && aaa.value.yestday_visit) || []],
            [...(aaa.value && aaa.value.user_online) || []],
            
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
          title: ["今日浏览量", "昨日浏览量", "用户在线"],
          height: 400
        }
      }

    });

    // 搜索引擎
    const engine: any = computed(() => {
      let aaa = store.getters['talk/defaultStatistics'].engine || {}
      return {
        data: {
          labels: aaa.labels, //['谷歌', '百度', '搜狗', "360", "必应", "头条"],
          series: aaa.series // [20, 15, 40, 12, 232, 32]
        },
        options: {
          background: "#5ab25e",
          title: ["分布区域"],
          height: 200
        }
      }
    });

    const register: any = computed(() => {
      let aaa = store.getters['talk/defaultStatistics'].week || {}
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.ip) || []]
          ]
        },
        options: {
          background: "#5ab25e",
          title: ["最近7天IP量"],
          height: 200
        }
      }
    });

    // 七天访问量
        const weekVisit: any = computed(() => {
      let aaa = store.getters['talk/defaultStatistics'].week || {}
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.visit) || []],
            [...(aaa.value && aaa.value.online) || []],
          ]
          // "series": [
          //   [0, 23, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0],
          //   [0, 0, 0, 45, 0, 0, 0, 0, 0, 34, 2, 0, 0, 0],
          //   [0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          //   [0, 12, 0, 0, 0, 0, 0, 54, 0, 0, 0, 98, 0, 0]
          // ]
        },
        options: {
          title: ["7天浏览量", "在线用户"],
          height: 250
        }
      }

    });

    // 七天IP量
        const weekIp: any = computed(() => {
      let aaa = store.getters['talk/defaultStatistics'].month || {}
      debugger
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.visit) || []],
            [...(aaa.value && aaa.value.online) || []]
          ]
          // "series": [
          //   [0, 23, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0],
          //   [0, 0, 0, 45, 0, 0, 0, 0, 0, 34, 2, 0, 0, 0],
          //   [0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          //   [0, 12, 0, 0, 0, 0, 0, 54, 0, 0, 0, 98, 0, 0]
          // ]
        },
        options: {
          title: ["本月浏览量", "在线用户"],
          height: 250
        }
      }

    });

    function init() {
      store.dispatch('talk/DefaultStatistics')
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(init)
    return {
      visit,
      // order,
      hours,
      engine,
      register,
      weekVisit,
      weekIp,
      handleclick
    }
  }
})
</script>

<template>
<div class="mb10 col-md-9" style="overflow: auto;">
  <div class="mb10" style="overflow: hidden;">
    <AAA />
  </div>
</div>
<div class="col-md-3" style="overflow: auto;">

  <div style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        搜索设置
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ul class="form-wrap-box">
          <li class="li mb10"><span class="label">搜索框</span>
            <v-switch :data="{ item: {id: '1212'}, field: 'status', coding: '12321' }" className="right" />
          </li>
          <li class="li mb10"><span class="label">关键词</span>
            <v-switch :data="{ item: {id: '1212'}, field: 'status', coding: '12321' }" className="right" />
          </li>
          <li class="li"><span class="label">热词排榜</span>
            <v-switch :data="{ item: {id: '1212'}, field: 'status', coding: '12321' }" className="right" />
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
import AAA from '../keyword/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    AAA
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

    const user: any = computed(() => store.getters['basic/defaultStatistics'].user || {});
    const hours: any = computed(() => {
      let aaa = store.getters['basic/defaultStatistics'].hours || {}
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.today_online) || []],
            [...(aaa.value && aaa.value.today_visit) || []],
            [...(aaa.value && aaa.value.yestday_online) || []],
            [...(aaa.value && aaa.value.yestday_visit) || []]
          ]
          // "series": [
          //   [0, 23, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0],
          //   [0, 0, 0, 45, 0, 0, 0, 0, 0, 34, 2, 0, 0, 0],
          //   [0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          //   [0, 12, 0, 0, 0, 0, 0, 54, 0, 0, 0, 98, 0, 0]
          // ]
        },
        options: {
          title: ["今日浏览量", "今日在线", "昨日浏览量", "昨日在线"],
          height: 400
        }
      }

    });

    // 搜索引擎
    const engine: any = computed(() => {
      let aaa = store.getters['basic/defaultStatistics'].week || {}
      return {
        data: {
          labels: ['Bananas', 'Apples', 'Grapes'],
          series: [20, 15, 40]
        },
        options: {
          background: "#5ab25e",
          title: ["搜索占比"],
          height: 200
        }
      }
    });

    const register: any = computed(() => {
      let aaa = store.getters['basic/defaultStatistics'].week || {}
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
      let aaa = store.getters['basic/defaultStatistics'].week || {}
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
          title: ["7天浏览量", "7天在线"],
          height: 250
        }
      }

    });

    // 七天IP量
    const weekIp: any = computed(() => {
      let aaa = store.getters['basic/defaultStatistics'].month || {}
      debugger
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.visit) || []],
            [...(aaa.value && aaa.value.ip) || []]
          ]
          // "series": [
          //   [0, 23, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0],
          //   [0, 0, 0, 45, 0, 0, 0, 0, 0, 34, 2, 0, 0, 0],
          //   [0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          //   [0, 12, 0, 0, 0, 0, 0, 54, 0, 0, 0, 98, 0, 0]
          // ]
        },
        options: {
          title: ["本月浏览量", "本月IP量"],
          height: 250
        }
      }

    });

    function init() {
      store.dispatch('basic/DefaultStatistics')
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(init)
    return {
      user,
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

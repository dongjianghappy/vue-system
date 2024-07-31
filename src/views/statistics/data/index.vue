<template>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-4" style="padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="所有内容" :value="total.total || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日新增" :value="total.yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日新增" :value="total.today_num || 0" />
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="频道内容" :value="total.channel_count || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日新增" :value="total.channel_yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日新增" :value="total.channel_today_num || 0" />
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="模块内容" :value="total.module_count || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日新增" :value="total.module_yestday_num || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日新增" :value="total.module_today_num || 0" />
    </div>
  </div>
</div>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-8" style=" padding-right: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        频道内容统计
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ChartBar :chartData="channel.data" :chartOptions="channel.options" />
      </div>
    </div>
  </div>
  <div class="col-md-4" style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        模块内容统计
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ChartBar :chartData="module.data" :chartOptions="module.options" />
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
  ChartPie,
  ChartBar,
  
} from '@/components/packages/chart/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChartLine,
    ChartPie,
    ChartBar
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

    const total: any = computed(() => store.getters['basic/dataStatistics'].total || {});
    const channel: any = computed(() => {
      let aaa = store.getters['basic/dataStatistics'].channel || {}
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.num) || []]
          ]
        },
        options: {
          title: ["内容统计"],
          height: 400
        }
      }

    });


    const module: any = computed(() => {
      let aaa = store.getters['basic/dataStatistics'].module || {}
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.num) || []]
          ]
        },
        options: {
          title: ["内容统计"],
          height: 400
        }
      }

    });

    function init() {
      store.dispatch('basic/dataStatistics')
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(init)
    return {
      total,
      // order,
      channel,
      module,
      handleclick
    }
  }
})
</script>

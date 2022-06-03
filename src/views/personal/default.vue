<template>
<div class="mb10 col-md-10" style="overflow: auto;">
  <div class="mb10" style="overflow: hidden;">
    <div class="mb10" style="overflow: auto;">
      <div class="col-md-3" style="padding-right: 8px;">
        <v-statisticcard name="累计览量" :value="data.visit || 0" />
      </div>
      <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
        <v-statisticcard name="昨日览量" :value="data.praise || 0" />
      </div>
      <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
        <v-statisticcard name="今日览量" :value="data.comment || 0" />
      </div>
      <div class="col-md-3" style="padding-left: 8px;">
        <v-statisticcard name="累计评论" :value="data.download || 0" />
      </div>
    </div>
    <div class="mb10" style="overflow: auto;">
      <div class="col-md-9" style=" padding-right: 8px;">
        <div class="module-wrap">
          <div class="module-content plr15" style="height: 475px">
            <ChartLine :chartData="hours.data" :chartOptions="hours.options" />
          </div>
        </div>
      </div>
      <div class="col-md-3" style="padding-left: 8px;">
        <div class="module-wrap">
          <div class="module-head">
            最近更新
          </div>
          <div class="module-content" style="height: 424px">
            <ul>
              <li class="item-thum-wrap mb5" v-for="(item, index) in article" :key="index">
                <div class="item-title relative pl20"><span class="num">{{index+1}}</span>{{item.title}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="col-md-2" style="overflow: auto;">

  <div style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        设置
        <v-switch :data="{ item: channel, field: 'status', coding: 'O0000' }" className="right" />
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ul class="form-wrap-box">
          
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
  watch,
  useStore,
  useRoute,
  channels
} from '@/utils'
import {
  ChartLine
} from '@/components/packages/chart/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChartLine
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
    const route = useRoute();
    const channel: any = ref({})
    const data: any = computed(() => store.getters['basic/channelDefault'] || {});

    // 监听路由
    watch(route, (newValues, prevValues) => {
      init()
    })

    const hours: any = computed(() => {
      let aaa = store.getters['basic/channelDefault'].hours || {}
      return {
        data: {
          labels: aaa.label,
          series: [
            [...(aaa.value && aaa.value.today_online) || []],
            [...(aaa.value && aaa.value.today_visit) || []]
          ]
        },
        options: {
          title: ["今日浏览量", "昨日浏览量"],
          height: 400
        }
      }

    });

    const article: any = computed(() => store.getters['basic/channelDefault'].list || []);



    // 初始化
    function init() {
      store.dispatch('basic/ChannelDefault', {
        data: {
          coding: "12323"
        }
      })
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(() => {
      init()
    })
    return {
      channel,
      data,
      hours,
      article,
      handleclick,
    }
  }
})
</script>

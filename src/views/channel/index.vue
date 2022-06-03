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
        <v-switch :data="{ item: channel, field: 'status', coding: 'O0000' }" className="right" :auth="auth" />
      </div>
      <div class="module-content plr15" style="height: 545px">
        <ul class="form-wrap-box">
          <li class="li mb10"><span class="label">展示设置</span>
            <span class="right">
              <ShowSetting :data="{channel_id: channelData.id ,coding: 'O0018'}" :auth="auth.checked('display')" />
            </span>
          </li>
          <li class="li mb10"><span class="label">频道信息</span>
            <span class="right">
              <Info action="edit" :data="{id: channelData.id, coding: 'O0000'}" :render="renderChannel" :auth="auth.checked('info')" />
            </span>
          </li>
          <li class="li mb10"><span class="label">聚合标签</span>
            <span class="right">
              <Tag action="edit" :render="renderChannel" :data="{channel_id: channelData.id, coding: 'O0002'}" :auth="auth.checked('tag')" />
            </span>
          </li>
                    <li class="li mb10"><span class="label">内容来源</span>
            <span class="right">
              <Source action="edit" :render="renderChannel" :data="{channel_id: channelData.id, coding: 'O0017'}" :auth="auth.checked('tag')" />
            </span>
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
  watch,
  useStore,
  useRoute,
  channels
} from '@/utils'
import {
  ChartLine
} from '@/components/packages/chart/index'
import Info from './setting/components/info.vue'
import Tag from './setting/tag/index.vue'
import Source from './setting/source.vue'
import ShowSetting from '../../components/packages/setting/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Info,
    Tag,
    Source,
    ShowSetting,
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
      ctx,
      proxy
    }: any = getCurrentInstance();
    const channelData: any = channels();
    const coding: any = channels().coding.art;
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
    function renderChannel() {
      store.dispatch('common/Fetch', {
        api: "detail",
        data: {
          coding: "O0000",
          id: channelData.id,
        }
      }).then(res => {
        channel.value = res.result
      })
    }

    // 初始化
    function init() {
      store.dispatch('basic/ChannelDefault', {
        data: {
          coding: coding
        }
      })
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(() => {
      init()
      renderChannel()
    })
    return {
      channelData,
      channel,
      coding,
      data,
      hours,
      article,
      handleclick,
      renderChannel,
      auth: proxy.$auth.init(`channel/${channelData.module}`)
    }
  }
})
</script>

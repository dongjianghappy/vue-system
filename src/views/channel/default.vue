<template>
<div class="mb10" style="overflow: auto;">
  <div class="col-md-3 mb10" style="padding-right: 8px;" v-for="(item, index) in channel" :key="index">
    <div class="col-md-4">
      <v-statisticcard name="用户总量" :value="user.total" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日注册" :value="user.today" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日注册" :value="user.yesterday" />
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
    const channel = computed(() => store.getters['user/channel']);

    const user: any = computed(() => store.getters['basic/default'].user || {});
    const hours: any = computed(() => {
      let aaa = store.getters['basic/default'].hours || {}
      debugger
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
      // order,
      hours,
      visit,
      register,
      tech,
      article,
      handleclick,
      channel
    }
  }
})
</script>

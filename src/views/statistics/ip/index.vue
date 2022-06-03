<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu" url="/admin/statistics/domain">
  <template v-slot:content1>
      <List :render="init" :coding="coding" />
    </template>
        <template v-slot:content2>
      <List :render="init" :coding="coding" />
    </template>
    <template v-slot:content3>
      <List2 :render="init" :coding="coding" />
    </template>
    <template v-slot:content4>
      <List3 :render="init" :coding="coding" />
    </template>
  </v-tabs>
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
  useRoute,
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import List3 from "./components/list3.vue"
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
    List3
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const dataList = computed(() => store.getters['website/webinfo']);
    let menu: any = ref([{
        name: "今日IP",
        value: "appstore1"
      },
      {
        name: "IP占比",
        value: "appstore2"
      },
      {
        name: "IP明细",
        value: "appstore3"
      },
      {
        name: "IP库",
        value: "appstore3"
      }
    ])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/statistics/ip') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    function init() {
      store.dispatch('setting/ipAction', {
        api: tabsIndex.value !== '2' && tabsIndex.value !== '3' ? "todayIp" : "",
        tabsIndex: tabsIndex.value,
        data: {
          date: 'today',
          coding: tabsIndex.value === '2' ? 'S0000' : 'S0003',
          page: 1,
          pagesize: 10
        }
      })
    }
    onMounted(init)

    return {
      dataList,
      menu
    }
  }
})
</script>

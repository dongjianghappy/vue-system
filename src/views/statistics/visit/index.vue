<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :render="init" :coding="coding" />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :coding="coding" />
    </template>
    <template v-slot:content3>
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
    let menu: any = ref(visitPage)
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/statistics/visit') {
        tabsIndex.value = route.query.type
        init({
          page: 1
        })
      }
    })

    function init(param: any) {
      store.dispatch('setting/visitAction', {
        api: tabsIndex.value === '0' ? "visitStatistics" : tabsIndex.value === '1' ? 'interviewedTodayStatistics' : "",
        tabsIndex: tabsIndex.value,
        data: {
          coding: 'S0000',
          pagesize: 25,
          ...param
        }
      })
    }
    onMounted(() => {
      init({
        page: 1
      })
    })
    return {
      dataList,
      menu,
      tabsIndex,
      init
    }
  }
})
</script>

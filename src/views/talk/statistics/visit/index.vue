<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra>
      <v-space>
        <v-condition v-model:value="search" name="排序" icon="sort-desc" field="source_url" :enums="[{value: 'google', name: '谷歌'}, {value: 'baidu.com', name: '百度'}, {value: 'sogou.com', name: '搜狗'}, {value: 'so.com', name: '360'}, {value: 'bing', name: '必应'}, {value: 'toutiao.com', name: '头条'}, {value: 'sm.cn', name: '神马'}]" :render="init" />
      </v-space>
    </template>
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
    const pagesize: any = 10
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    const search: any = ref("")

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
      if(search.value != ""){
        param.source_url = search.value
      }
      store.dispatch('setting/visitAction', {
        api: tabsIndex.value === '0' ? "visitStatistics" : tabsIndex.value === '1' ? 'interviewedTodayStatistics' : "",
        tabsIndex: tabsIndex.value,
        data: {
          coding: 'S0000',
          pagesize: pagesize,
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
      search,
      init
    }
  }
})
</script>

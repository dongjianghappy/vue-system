<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :render="init" :coding="coding" :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List :render="init" :coding="coding" :dataList="dataList" />
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
export default defineComponent({
  name: 'HomeViewdd',
  components: {List},
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
    const dataList: any = ref([]);
     let menu: any = ref([
      {
        name: "今日搜索",
        value: "advertisement2"
      },
      {
        name: "搜索明细",
        value: "advertisement3"
      }
    ])
     const pagesize: any = 10
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/search/list') {
        tabsIndex.value = route.query.type
        init({
          page: 1
        })
      }
    })

    function init(param: any) {
      store.dispatch('common/Fetch', {
        api: "searchList",
        data: {
          time: tabsIndex.value === '1' ? 'all' : "today",
          pagesize: pagesize,
          ...param
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
    onMounted(() => {
      init({
        page: 1
      })
    })

    return {
      dataList,
      tabsIndex,
      menu,
    }
  }
})
</script>


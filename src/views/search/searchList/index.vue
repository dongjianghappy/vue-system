<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :render="init" :coding="coding" :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <Calendar :render="dateInit" :dataList="calendarData" />
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
import Calendar from "./components/calendar.vue"

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    Calendar
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
    const dataList: any = ref([]);
    const calendarData: any = ref([])
    let menu: any = ref([{
        name: "搜索明细",
        value: "advertisement2"
      },
      {
        name: "日期查看",
        value: "advertisement3"
      }
    ])
    const pagesize: any = 10
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/search/list') {
        tabsIndex.value = route.query.type
        if (tabsIndex.value === '0') {
          init({
            page: 1
          })
        } else {
          let date: any = new Date()
          dateInit({
            year: date.getFullYear(),
            month: date.getMonth() + 1
          })
        }

      }
    })

    function init(param: any) {
      store.dispatch('common/Fetch', {
        api: "searchList",
        data: {
          time: "all",
          pagesize: pagesize,
          ...param
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    function dateInit(param: any) {
      store.dispatch('common/Fetch', {
        api: "Calendar",
        data: {
          type: 'search',
          ...param
        }
      }).then((res: any) => {
        calendarData.value = res.result
        debugger
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
      dateInit,
      calendarData
    }
  }
})
</script>

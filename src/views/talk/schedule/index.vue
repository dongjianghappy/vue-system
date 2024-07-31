<template>
<div class="bg-white">
  <v-tabs :tabs="tabsSchedule">
    <template v-slot:extra>
      <Detail :data="{ coding }" :render="init" />
    </template>
    <template v-slot:content1>
      <List :render="init" :data="{ coding }" :dataList="dataList" :tabsIndex='tabsIndex' />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :data="{ coding }" :dataList="dataList" :tabsIndex='tabsIndex' />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  useRoute,
  useStore,
  codings
} from '@/utils'
import {
  tabsSchedule
} from '@/assets/const'
import List from './components/list.vue'
import List2 from './components/list2.vue'
import Detail from './components/detail.vue'

export default defineComponent({
  name: 'IndexView',
  components: {
    List,
    List2,
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings.user.schedule.cate
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/talk/schedule') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init() {

      store.dispatch('common/Fetch', {
        data: {
          coding: coding,
          system: tabsIndex.value === "1" ? 0 : 1
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      tabsSchedule,
      coding,
      tabsIndex,
      init,
      dataList
    }
  }
})
</script>

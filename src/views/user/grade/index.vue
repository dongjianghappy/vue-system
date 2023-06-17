<template>
<div class="bg-white ptb5">
  <v-tabs :tabs="tabsUserGrade">
    <template v-slot:extra>
      <Detail :data="{coding}" :render="init" />
    </template>
    <template v-slot:content1>
      <List :data="{coding}" name='频道名称' :dataList="dataList" :render="init" />
    </template>
    <template v-slot:content2>
      <List :data="{coding}" name='应用名称' :dataList="dataList" :render="init" />
    </template>
    <template v-slot:content3>
      <List :data="{coding}" name='权限名称' :dataList="dataList" :render="init" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  codings
} from '@/utils'
import {
  tabsUserGrade,
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'GradeView',
  components: {
    List,
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings.user.grade
    const dataList: any = ref([]);
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    let page: any = ref(visitPage[0])
    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/user/grade') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "userGrade",
        data: {
          type: 1 + parseInt(tabsIndex.value)
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
    onMounted(init)
    return {
      tabsUserGrade,
      coding,
      dataList,
      init,
      page
    }
  }
})
</script>

<template>
<div class="bg-white ptb5">
  <v-tabs :tabs="menu">
    <template v-slot:extra>
      <Detail :data="{coding: 'U0003'}" />
    </template>
    <template v-slot:content1>
      <List :data="{coding: 'U0003'}" name='频道名称' :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List :data="{coding: 'U0003'}" name='应用名称' :dataList="dataList" />
    </template>
    <template v-slot:content3>
      <List :data="{coding: 'U0003'}" name='权限名称' :dataList="dataList" />
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
  useStore,
  useRoute,
} from '@/utils'
import {
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
    const dataList: any = ref([]);
    let menu: any = ref([{
        name: "频道权限",
        value: "appstore1"
      },
      {
        name: "应用权限",
        value: "appstore2"
      },
      {
        name: "功能权限",
        value: "appstore2"
      }
    ])
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
      dataList,
      page,
      menu
    }
  }
})
</script>

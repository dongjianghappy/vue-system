<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :render="init" :data={coding} :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List :render="init" :data={coding} :dataList="dataList" />
    </template>
    <template v-slot:content3>
      <List :render="init" :data={coding} :dataList="dataList" />
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
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
import List from './components/list.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['user'];
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    let menu: any = ref([{
        name: "普通用户",
        value: "appstore1"
      },
      {
        name: "高级用户",
        value: "appstore2"
      },
      {
        name: "管理员",
        value: "appstore3"
      }
    ])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/user/list') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init() {
      store.dispatch('common/Fetch', {
        api: 'userList',
        data: {
          level: tabsIndex.value,
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result || {}
      })
    }

    onMounted(init)

    return {
      menu,
      init,
      dataList,
      coding
    }
  }
})
</script>

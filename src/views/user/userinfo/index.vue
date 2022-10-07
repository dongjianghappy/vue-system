<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu" type="vertical">
    <template v-slot:content1>
      <List :render="init" :data={coding} :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <Manage :render="init" :data={coding} :dataList="dataList" />
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
  useRoute,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
import List from './components/list.vue'
import Manage from './components/manage.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    Manage,
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['user'];
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    const pagesize: any = 10
    let menu: any = ref([{
        name: "普通用户",
        value: "appstore1"
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
        init({
          page: 1
        })
      }
    })

    // 初始化
    function init(param: any) {

      const sssss: any = {
        page: 1,
        pagesize: pagesize
      }

      Object.assign(sssss, param)
      store.dispatch('user/userListAction', {
        tabsIndex: tabsIndex.value === '1' ? 1 : 0,
        data: {
          role: tabsIndex.value,
          ...sssss
        }
      })
    }

    onMounted(() => {
      init({
        page: 1
      })
    })

    return {
      menu,
      init,
      dataList,
      coding
    }
  }
})
</script>

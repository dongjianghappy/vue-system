<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsUser" type="vertical">
    <template v-slot:content1>
      <List :render="init" :data={coding} :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <Verified />
    </template>
    <template v-slot:content3>
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
  useStore,
  codings
} from '@/utils'
import {
  tabsUser
} from '@/assets/const'
import Detail from './components/detail.vue'
import List from './components/list.vue'
import Manage from './components/manage.vue'
import Verified from './components/verified.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    Manage,
    Verified,
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['user'];
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/user/list') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)
      store.dispatch('user/userListAction', {
        tabsIndex: tabsIndex.value === '1' ? 1 : 0,
        data: {
          admin: tabsIndex.value,
          ...params
        }
      })
    }

    onMounted(() => {
      init()
    })

    return {
      tabsUser,
      init,
      dataList,
      coding
    }
  }
})
</script>

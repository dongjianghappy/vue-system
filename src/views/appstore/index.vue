<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsApp">
    <template v-slot:extra>
      <Detail action='add' :data="{ coding }" :render="init" :auth="auth.checked('add')" />
    </template>
    <template v-slot:content1>
      <List :render="init" :data="{ coding }" :dataList="dataList" :tabsIndex='tabsIndex' :auth="auth" />
    </template>
    <template v-slot:content2>
      <List :render="init" :data="{ coding }" :dataList="dataList" :tabsIndex='tabsIndex' :auth="auth" />
    </template>
    <template v-slot:content3>
      <List :render="init" :data="{ coding }" :dataList="dataList" :tabsIndex='tabsIndex' :auth="auth" />
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
  codings,
} from '@/utils'
import {
  tabsApp
} from '@/assets/const'
import Detail from './components/detail.vue'
import List from './components/list.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['appstore'];
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    const dataList: any = ref([])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/appstore') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init() {
      store.dispatch('setting/appstoreAction', {
        tabsIndex: tabsIndex.value,
        data: {
          type: tabsIndex.value === 3 ? 0 : parseInt(tabsIndex.value) + 1
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      tabsApp,
      coding,
      tabsIndex,
      init,
      dataList,
      auth: proxy.$auth.init('appstore')
    }
  }
})
</script>

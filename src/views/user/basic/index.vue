<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsUserInfo" type="vertical">
    <template v-slot:content1>
      <Info :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content2>
      <Password :render="init" :data="{ coding }" />
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
  tabsUserInfo
} from '@/assets/const'
import Info from './info/index.vue'
import Password from './components/password.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    // List,
    Info,
    Password
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = proxy.$coding['link'];
    const dataList: any = ref([])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      init()
    })

    // 初始化
    function init() {
      store.dispatch('common/Fetch', {
        api: 'userList',
        data: {
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      tabsUserInfo,
      coding,
      init,
      dataList
    }
  }
})
</script>

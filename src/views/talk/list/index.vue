<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra>
      <Detail action='add' :data="{ coding }" :render="init" />
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
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  codings,
} from '@/utils'
import List from './components/list.vue'
import List2 from './components/list2.vue'
import {
  appstorePage
} from '@/assets/const'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['appstore'];
    let menu: any = ref([{
        name: "微博管理",
        value: "advertisement1"
      },
      {
        name: "正在审核",
        value: "advertisement2"
      }
    ])
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
      store.dispatch('talk/talkAction', {
        tabsIndex: tabsIndex.value,
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
      coding,
      menu,
      tabsIndex,
      init,
      dataList
    }
  }
})
</script>

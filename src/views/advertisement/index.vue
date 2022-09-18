<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu" type="vertical">
    <template v-slot:content1>
      <List :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content3>
      <List3 :render="init" :data="{ coding }" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch,
  ref,
  useRoute,
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import List from './components/list.vue'
import List2 from './components/list2.vue'
import List3 from './components/list3.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
    List3,
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['advertisement'];
    let menu: any = ref([{
        name: "广告管理",
        value: "advertisement1"
      },
      {
        name: "广告申请",
        value: "advertisement2"
      },
      {
        name: "订单列表",
        value: "advertisement3"
      }
    ])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/link') {
        tabsIndex.value = route.query.type
        init({
          page: 1,
          pagesize: 25
        })
      }
    })

    // 初始化
    function init(params: any) {

      const sssss: any = {
        page: 1,
        pagesize: 30
      }
      Object.assign(sssss, params)

      store.dispatch('basic/linkAction', {
        tabsIndex: tabsIndex.value,
        data: {
          coding,
          ...sssss
        }
      })
    }

    onMounted(() => {
      init({
        page: 1,
        pagesize: 25
      })
    })

    return {
      coding,
      menu,
      init
    }
  }
})
</script>

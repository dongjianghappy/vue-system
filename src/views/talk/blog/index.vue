<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsBlog">
    <template v-slot:extra>
      
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
  useRouter,
  codings,
} from '@/utils'
import {
  tabsBlog
} from '@/assets/const'
import List from './components/list.vue'
import List2 from './components/list2.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const coding: any = codings.user.blog_extend;
    
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    const dataList: any = ref([])

    // 监听路由
    watch(router.currentRoute, (newValues, prevValues) => {
      if (newValues.path === prevValues.path) {
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
      const {
        type
      }: any = route.query
      store.dispatch('common/Fetch', {
        data: {
          coding: coding,
          management_checked: type === '1' ? 0 : 1, // 是否审核,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      tabsBlog,
      coding,
      tabsIndex,
      init,
      dataList
    }
  }
})
</script>

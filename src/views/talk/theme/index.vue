<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu" type="vertical">
    <template v-slot:content1>
      <List :render="init" :data="{coding: coding.theme}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List :render="init" :data="{coding: coding.effects}" :type='tabsIndex' :dataList="dataList" />
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
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
import List from './components/list.vue'

import {
  linkPage
} from '@/assets/const'
export default defineComponent({
  name: 'IndexView',
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
    const coding: any = proxy.$coding['user'];
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    let menu: any = ref([{
        name: "主题风格",
        value: "appstore1"
      },
      {
        name: "背景特效",
        value: "appstore2"
      }
    ])
    let page: any = ref(linkPage[0])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/user/theme') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init() {
      const {
        type
      }: any = route.query

      store.dispatch('common/Fetch', {
        api: tabsIndex.value === '1' ? 'effects' : 'theme'
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      menu,
      page,
      tabsIndex,
      init,
      dataList
    }
  }
})
</script>

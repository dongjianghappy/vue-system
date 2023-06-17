<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsTalkTheme" type="vertical">
    <template v-slot:content1>
      <List :render="init" :data="{coding: coding.theme}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List :render="init" :data="{coding: coding.effects}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content3>
      <List2 :render="init" :data="{coding: coding.pendant}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content4>
      <CursorList :render="init" :data="{coding: coding.cursor}" :type='tabsIndex' :dataList="dataList" />
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
  useStore,
  codings
} from '@/utils'
import {
  tabsTalkTheme
} from '@/assets/const'
import List from './components/list.vue'
import List2 from './components/list2.vue'
import CursorList from './components/cursorList.vue'


export default defineComponent({
  name: 'IndexView',
  components: {
    List,
    List2,
    CursorList
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings.user
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/talk/theme') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init() {
      let code = coding.theme
      if (tabsIndex.value === '1') {
        code = coding.effects
      } else if (tabsIndex.value === '2') {
        code = coding.pendant
      } else if (tabsIndex.value === '3') {
        code = coding.cursor
      }
      

      store.dispatch('common/Fetch', {
        api: 'theme',
        data: {
          coding: code
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      tabsTalkTheme,
      coding,
      tabsIndex,
      init,
      dataList
    }
  }
})
</script>

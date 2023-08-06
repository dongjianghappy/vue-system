<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsSign" type="vertical">
    <template v-slot:content1>
      <List :render="init" :data="{coding: coding.sign}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <CursorList :render="init" :data="{coding: coding.sign_love}" :type='tabsIndex' :dataList="dataList" />
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
  tabsSign
} from '@/assets/const'
import List from './components/list.vue'
import CursorList from './components/cursorList.vue'


export default defineComponent({
  name: 'IndexView',
  components: {
    List,
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
      if (route.path === '/admin/talk/sign') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init() {
      let code = coding.sign
      if (tabsIndex.value === '1') {
        code = coding.sign_love
      }
      

      store.dispatch('common/Fetch', {
        data: {
          coding: code
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      tabsSign,
      coding,
      tabsIndex,
      init,
      dataList
    }
  }
})
</script>

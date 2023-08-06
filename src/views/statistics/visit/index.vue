<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra v-if="isWebsite">
      <v-space>
        <v-condition v-model:value="search" name="排序" icon="sort-desc" field="source_url" :enums="[{value: 'google', name: '谷歌'}, {value: 'baidu.com', name: '百度'}, {value: 'sogou.com', name: '搜狗'}, {value: 'so.com', name: '360'}, {value: 'bing', name: '必应'}, {value: 'toutiao.com', name: '头条'}, {value: 'sm.cn', name: '神马'}]" :render="getData" />
      </v-space>
    </template>
    <template v-slot:content1>
      <List ref="refList" :coding="coding" />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :coding="coding" />
    </template>
    <template v-slot:content3>
      <Calendar />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  watch,
  useRoute,
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import Calendar from "./components/calendar.vue"
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
    Calendar
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const dataList = computed(() => store.getters['website/webinfo']);
    let isWebsite: any = ref(route.path.indexOf("talk") === -1 ? true : false)
    let menu: any = ref(visitPage)
    const pagesize: any = 10
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    const search: any = ref("")
    const refList: any = ref(null)

    function getData(parm: any){
      debugger
      refList.value.init(parm)
    }

    return {
      dataList,
      menu,
      isWebsite,
      tabsIndex,
      search,
      refList,
      getData
    }
  }
})
</script>

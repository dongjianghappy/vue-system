<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :render="init" :coding="coding" :type='page.value' :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <Lis2 :render="init" :coding="coding" :type='page.value' :dataList="dataList" />
    </template>
    <template v-slot:content3>
      <List3 :render="init" :coding="coding" :type='page.value' :dataList="dataList" />
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
import List3 from "./components/list3.vue"
export default defineComponent({
  name: 'HomeViewdd',
  components: {List, List2, List3},
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
     let menu: any = ref([{
        name: "搜索概况量",
        value: "advertisement1"
      },
      {
        name: "今日搜索",
        value: "advertisement2"
      },
      {
        name: "搜索明细",
        value: "advertisement3"
      }
    ])
    let page: any = ref(visitPage[0])
    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      type.value = qq.type
    })


    return {
      dataList,
      page,
      menu,
      type
    }
  }
})
</script>


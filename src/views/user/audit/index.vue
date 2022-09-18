<template>
<div class="bg-white">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :coding="coding" :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List2 :coding="coding" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  watch,
  useRoute,
} from '@/utils'
import {
  useStore
} from 'vuex'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2
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
    let menu: any = ref([{
        name: "注册审核",
        value: "appstore1"
      },
      {
        name: "邮箱审核",
        value: "appstore2"
      }
    ])
    
    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      type.value = qq.type

    })

    return {
      dataList,
      menu
    }
  }
})
</script>

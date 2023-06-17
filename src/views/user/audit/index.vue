<template>
<div class="bg-white">
  <v-tabs :tabs="tabsUserAudit">
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
  useStore,
  useRoute,
} from '@/utils'
import {
  tabsUserAudit
} from '@/assets/const'
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

    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      type.value = qq.type

    })

    return {
      tabsUserAudit,
      dataList
    }
  }
})
</script>

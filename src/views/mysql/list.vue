<template>
<div class="bg-white">
  <v-tabs :tabs="tabsMysql">
    <template v-slot:content1>
      <List :coding="coding" />
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
  computed,
  ref,
  watch,
  useRoute,
  useStore
} from '@/utils'
import {
  tabsMysql
} from '@/assets/const'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
export default defineComponent({
  name: 'MysqlView',
  components: {
    List,
    List2
  },
  setup(props, context) {
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
      tabsMysql,
      dataList
    }
  }
})
</script>

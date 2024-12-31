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

<script setup lang="ts">
import {
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

    const store = useStore();
    const route = useRoute();

    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      type.value = qq.type

    })
</script>

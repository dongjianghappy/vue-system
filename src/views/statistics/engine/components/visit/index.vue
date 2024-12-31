<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <List :render="init" :coding="coding" :type='page.value' v-if="type === '0'" />
    <List2 :render="init" :coding="coding" :type='page.value' v-else-if="type === '1'" />
    <List3 :render="init" :coding="coding" :type='page.value' v-else />
  </v-tabs>
  </div>
</template>

<script setup lang="ts">
import {
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
    const store = useStore();
    const route = useRoute();
    let menu: any = ref(visitPage)
    let page: any = ref(visitPage[0])
    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      type.value = qq.type
    })
</script>


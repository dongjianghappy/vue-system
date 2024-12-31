<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu" url="/admin/statistics/domain">
      <template v-slot:content1>
      <List :render="init" :coding="coding" />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :coding="coding" />
    </template>
  </v-tabs>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  ref,
  watch,
  useRoute,
  useStore
} from '@/utils'

import List from "./components/list.vue"
import List2 from "./components/list2.vue"

    const store = useStore();
    const route = useRoute();
    const dataList = computed(() => store.getters['website/webinfo']);
    let menu: any = ref([{
        name: "搜索占比",
        value: "appstore1"
      },
      {
        name: "搜索明细",
        value: "appstore2"
      }
    ])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/statistics/engine') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    function init() {
      store.dispatch('setting/engineAction', {
        api: tabsIndex.value === '0' ? "enginePercentage" : "",
        tabsIndex: tabsIndex.value,
        data: {
          coding: 'S0005',
          page: 1,
          pagesize: 10
        }
      })
    }
    onMounted(init)
</script>

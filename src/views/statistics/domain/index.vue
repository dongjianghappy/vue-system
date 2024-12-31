<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :render="init" :coding="coding" />
    </template>
    <template v-slot:content2>
      <List :render="init" :coding="coding" />
    </template>
    <template v-slot:content3>
      <List2 :render="init" :coding="coding" />
    </template>
  </v-tabs>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
  useRoute,
  useStore
} from '@/utils'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"

    const store = useStore();
    const route = useRoute();
    let menu: any = ref([{
        name: "今日域名占比",
        value: "appstore1"
      },
      {
        name: "来路域名占比",
        value: "appstore2"
      },
      {
        name: "来路域名明细",
        value: "appstore3"
      }
    ])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/statistics/domain') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    function init() {
      store.dispatch('setting/domainAction', {
        api: tabsIndex.value !== '2' ? "domainPercentage" : "",
        tabsIndex: tabsIndex.value,
        data: {
          coding: 'S0001',
          page: 1,
          pagesize: 10
        }
      })
    }
    onMounted(init)
    
</script>

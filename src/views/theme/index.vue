<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsTheme" type="vertical">
    <template v-slot:content1>
      <List :render="init" :data="{coding: coding.theme}" :type='tabsIndex' :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List :render="init" :data="{coding: coding.effects}" :type='tabsIndex' :dataList="dataList" />
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
  useStore,
  codings
} from '@/utils'
import {
  tabsTheme
} from '@/assets/const'
import Detail from './components/detail.vue'
import List from './components/list.vue'
    const store = useStore();
    const route = useRoute();
    const coding: any = codings;
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    let menu: any = ref()

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/theme') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: 'theme',
        data: {
          coding: tabsIndex.value === '1' ? coding.effects : coding.theme
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)
</script>

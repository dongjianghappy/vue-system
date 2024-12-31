<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsJournal">
    <template v-slot:extra>
      <v-space>
        <span class="mt10"><v-search field="content" placeholder="内容查找" :render="init" /></span>
        <Group :data="{coding: coding.cate}" />
      </v-space>
    </template>
    <template v-slot:content1>
      <List :data="{ coding }" :dataList="dataList" :render="init" />
    </template>
    <template v-slot:content2>
      <List2 :data="{ coding }" :dataList="dataList" :render="init" />
    </template>
  </v-tabs>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  codings,
} from '@/utils'
import {
  tabsJournal
} from '@/assets/const'
import Group from '../group/detail.vue'
import List from './components/list.vue'
import List2 from './components/list2.vue'
const store = useStore();
const route = useRoute();
const coding: any = codings.talk.journal;
const tabsIndex: any = ref(route.query.type || 0) // tbs索引
const dataList: any = ref([])

// 监听路由
watch(route, (newValues, prevValues) => {
  if (route.path === '/admin/talk/messageBoard') {
    tabsIndex.value = route.query.type
    init()
  }
})

// 初始化
function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 25
  }

  Object.assign(params, param)

  if(tabsIndex.value === '1'){
    return
  }
  
  store.dispatch('common/Fetch', {
    api: 'journal',
    tabsIndex: tabsIndex.value,
    data: {
      management_checked: tabsIndex.value === '2' ? 0 : 1, // 是否审核,
      ...params
    }
  }).then((res: any) => {
    dataList.value = res.result
  })
}
onMounted(init)
</script>

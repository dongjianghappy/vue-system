<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsMessageBoard">
    <template v-slot:extra>
      <v-search field="content" placeholder="内容查找" :render="init" />
    </template>
    <template v-slot:content1>
      <List :data="{ coding }" :dataList="dataList" :render="init" />
    </template>
    <template v-slot:content2>
      <Reply />
    </template>
    <template v-slot:content3>
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
  tabsMessageBoard
} from '@/assets/const'
import List from './components/list.vue'
import List2 from './components/list2.vue'
import Reply from './reply/index.vue'
const store = useStore();
const route = useRoute();
const coding: any = codings.talk.message_board;
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
    api: 'userMessageBoard',
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

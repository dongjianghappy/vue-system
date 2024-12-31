<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsMessageBoard">
    <template v-slot:extra>
      <v-search field="content" placeholder="内容查找" :render="init" />
    </template>
    <template v-slot:content1>
      <List :render="init" :data="{ coding }" :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :data="{ coding }" :dataList="dataList" />
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
  useRouter,
  codings,
} from '@/utils'
import {
  tabsMessageBoard
} from '@/assets/const'
import List from './components/list.vue'
import List2 from './components/list2.vue'
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const coding: any = codings.service.message_board;
    
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    const dataList: any = ref([])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/messageBoard') {
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
      
      store.dispatch('basic/messageBoard', {
        api: 'messageBoard',
        tabsIndex: tabsIndex.value,
        data: {
          management_checked: tabsIndex.value === '1' ? 0 : 1, // 是否审核,
          ...params
        }
      })
    }

    onMounted(init)
</script>

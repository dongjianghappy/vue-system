<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsTalk">
    <template v-slot:extra>
      <v-space>
        <span class="pt10">
          <v-search field="summary" placeholder="微博内容查找" :render="init" />
        </span>
        <v-condition name="类型" icon="sort-desc" field="type" :enums="[{value: 'sign', name: '签到'}, {value: 'schedule', name: '日程'}]" :render="init" />
        <Cate />
      </v-space>
    </template>
    <template v-slot:content1>
      <List :render="init" :data="{ coding }" :dataList="dataList" :tabsIndex='tabsIndex' />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :data="{ coding }" :dataList="dataList" :tabsIndex='tabsIndex' />
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
  tabsTalk
} from '@/assets/const'
import List from './components/list.vue'
import Cate from './cate/index.vue'
import List2 from './components/list2.vue'
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const coding: any = codings.talk.art;
    
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    const dataList: any = ref([])

    // 监听路由
    watch(router.currentRoute, (newValues, prevValues) => {
      if (newValues.path === prevValues.path) {
        init()
      }
    })

    // 初始化
    function init(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)
      const {
        type
      }: any = route.query
      store.dispatch('talk/talkAction', {
        tabsIndex: tabsIndex.value,
        data: {
          management_checked: type === '1' ? 0 : 1, // 是否审核,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="用户管理">
      <template v-slot:extraright>
        <v-space>
          <v-search field="uid" placeholder="用户账号查找" :render="render" />
          <!-- <v-condition name="状态" field="status" :defaultValue="{value: '', name: '所有'}" :enums="[{value: '0', name: '正常'}, {value: '1', name: '禁用'}, {value: '2', name: '封号'}]" :render="init" /> -->
          <v-condition name="用户" field="grade" :defaultValue="{value: '', name: '所有'}" :enums="[{value: '0', name: '访客'},{value: '1', name: '普通用户'},{value: '2', name: '高级用户'},{value: '3', name: 'VIP用户'},{value: '4', name: '超级VIP'}]" :render="init" />
          <Recommend />
          <Weibo :data={coding} />
          <Manage :data={coding} />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <List :render="init" :data={coding} :dataList="dataList" />
  </div>
</div>
<!-- <div class="module-wrap nobg">
  <v-tabs :tabs="tabsUser" type="vertical">
    <template v-slot:content1>
      <List :render="init" :data={coding} :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <Verified />
    </template>
    <template v-slot:content3>
      <Manage :render="init" :data={coding} :dataList="dataList" />
    </template>
  </v-tabs>
</div> -->
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
  tabsUser
} from '@/assets/const'
import Detail from './components/detail.vue'
import Weibo from './components/weibo.vue'
import Recommend from './components/recommend.vue'
import List from './components/list.vue'
import Manage from './components/manage.vue'
import Verified from './components/verified.vue'

    const store = useStore();
    const route = useRoute();
    const coding: any = codings['user'];
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/user/list') {
        tabsIndex.value = route.query.type
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
      store.dispatch('user/userListAction', {
        data: {
          admin: 0,
          ...params
        }
      })
    }

    onMounted(() => {
      init()
    })
</script>

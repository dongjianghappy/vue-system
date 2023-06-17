<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsLink" type="vertical">
    <template v-slot:content1>
      <List1 :data="{coding}" :loading="loading" :siteEnum="siteEnum" :render="init" :auth="auth" />
    </template>
    <template v-slot:content2>
      <List2 :data="{coding}" :loading="loading" :siteEnum="siteEnum" :render="init" :auth="auth" />
    </template>
    <template v-slot:content3>
      <List3 :data="{coding}" :loading="loading" :render="init" :auth="auth" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  watch,
  ref,
  useRoute,
  useStore,
  codings,
} from '@/utils'

import List1 from './components/list1.vue'
import List2 from './components/list2.vue'
import List3 from './components/list3.vue'
import {
  tabsLink
} from '@/assets/const'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List1,
    List2,
    List3,
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings
    const loading: any = ref(false)
    const siteEnum: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/link') {
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

      if (tabsIndex.value === '2') delete param.method
      loading.value = false
      store.dispatch('basic/linkAction', {
        tabsIndex: tabsIndex.value,
        data: {
          coding: coding.links,
          method: tabsIndex.value === "1" ? 1 : 0, // 是否出售1: 交换, 0: 出售
          apply_checked: tabsIndex.value === '2' ? 0 : 1, // 是否审核1: 审核, 0: 未审核
          ...params
        }
      }).then(res => {
        loading.value = true
      })
    }

    function getSite() {
      // 获取站点信息
      store.dispatch('basic/Fetch', {
        data: {
          coding: coding.site,
          status: '1'
        }
      }).then(res => {
        res.result.map((item: any) => {
          siteEnum.value.push({
            value: item.id,
            name: item.name
          })
        })
      })
    }

    onMounted(() => {
      init()
      getSite()
    })

    return {
      tabsLink,
      coding: coding,
      init,
      loading,
      siteEnum,
      auth: proxy.$auth.init('link')
    }
  }
})
</script>

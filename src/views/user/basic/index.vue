<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu" type="vertical">
    <template v-slot:content1>
      <Info :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content2>
      <Password :render="init" :data="{ coding }" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
} from '@/utils'
import Info from './info/index.vue'
import Password from './components/password.vue'
import {
  linkPage
} from '@/assets/const'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    // List,
    Info,
    Password
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = proxy.$coding['link'];
    const dataList: any = ref([])
    let menu: any = ref([{
        name: "个人资料",
        value: "appstore1"
      },
      {
        name: "修改密码",
        value: "appstore2"
      }
    ])
    let page: any = ref(linkPage[0])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      page.value = linkPage[qq.type]
      init()
    })

    // 初始化
    function init() {
      store.dispatch('common/Fetch', {
        api: 'userList',
        data: {
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      menu,
      page,
      init,
      dataList
    }
  }
})
</script>

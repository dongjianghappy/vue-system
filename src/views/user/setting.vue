<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu" type="vertical">
    <template v-slot:content1>
      
    </template>
    <template v-slot:content2>
      <Recommend />
    </template>   
    <template v-slot:content3>
      <Banuser />
    </template>  
    <template v-slot:content4>
      <Audit />
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
  useRoute,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Recommend from './recommend/index.vue'
import Banuser from './banuser/index.vue'
import Audit from './audit/index.vue'
// import Recommend from './recommend/index.vue'
// import Banuser from './banuser/index.vue'
// import Audit from './audit/index.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Recommend,
    Banuser,
    Audit
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['user'];
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    let menu: any = ref([{
        name: "会员权限",
        value: "appstore1"
      },
      {
        name: "用户角色",
        value: "appstore3"
      },
      {
        name: "用户等级",
        value: "appstore3"
      },
      {
        name: "积分设置",
        value: "appstore3"
      },
      {
        name: "保密问题",
        value: "appstore3"
      },
      {
        name: "心情管理",
        value: "appstore3"
      }
    ])

    // // 监听路由
    // watch(route, (newValues, prevValues) => {
    //   if (route.path === '/admin/user/list') {
    //     tabsIndex.value = route.query.type
    //     init()
    //   }
    // })

    // // 初始化
    // function init() {
    //   store.dispatch('common/Fetch', {
    //     api: 'userList',
    //     data: {
    //       level: tabsIndex.value,
    //       page: 1,
    //       pagesize: 10
    //     }
    //   }).then(res => {
    //     dataList.value = res.result || {}
    //   })
    // }

    // onMounted(init)

    return {
      menu,
      dataList,
      coding
    }
  }
})
</script>

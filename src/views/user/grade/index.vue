<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
   <template v-slot:extra>
   <Detail :data="{coding: 'U0003'}" :type='page.value'  />
 </template> 
 <template v-slot:content1>
   <List :data="{coding: 'U0003'}" :type='page.value' :dataList="dataList" />
 </template>
  <template v-slot:content2>
   <List :data="{coding: 'U0003'}" :type='page.value' :dataList="dataList" />
 </template>  
   <template v-slot:content3>
   <List :data="{coding: 'U0003'}" :type='page.value' :dataList="dataList" />
 </template>   
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  watch,
  useRoute,
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    Detail
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const dataList: any = ref([]);
    let menu: any = ref([{
        name: "频道权限",
        value: "appstore1"
      },
      {
        name: "应用权限",
        value: "appstore2"
      },
      {
        name: "功能权限",
        value: "appstore2"
      }
    ])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    let page: any = ref(visitPage[0])
    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/user/grade') {
        tabsIndex.value = route.query.type
        init()
      }
    })

   function init() {
      store.dispatch('common/Fetch', {
        api: "userGrade",
        data: {
          type: 1+parseInt(tabsIndex.value)
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
onMounted(init)
    return {
      dataList,
      page,
      menu,
      type
    }
  }
})
</script>

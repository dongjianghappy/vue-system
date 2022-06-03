<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra>
      <Detail :data="{ coding }" :render="init" />
    </template>
    <template v-slot:content1>
      <List :coding="coding" :type='page.value' :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List :coding="coding" :type='page.value' :dataList="dataList" />
    </template>
    <template v-slot:content3>
      <List :coding="coding" :type='page.value' :dataList="dataList" />
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
import Detail from "./components/detail.vue"
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
    const dataList: any = ref([])

    let menu: any = ref([{
        name: "导航标签",
        value: "appstore1"
      },
      {
        name: "分类标签",
        value: "appstore2"
      },
      {
        name: "文档标签",
        value: "appstore2"
      }
    ])
    let page: any = ref(visitPage[0])
    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      type.value = qq.type
      init()

    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "getFlag",
        data: {
          channel_id: 0,
          type: route.query.page === "2" ? "art" : route.query.page === "1" ? "cat" : "nav"
        }
      }).then(res => {
        dataList.value = res.result || []
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

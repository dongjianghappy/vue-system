<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra>
      <span @click="handleClick('add')" class="pointer"><i class="iconfont icon-add" />新增文档</span>
    </template>
    <template v-slot:content1>
      <List :type='page.value' :dataList="dataList" :data="{...channelData, aaa}" />
    </template>
    <template v-slot:content2>
      <List2 :type='page.value' :dataList="dataList" :data="{...channelData}" />
    </template>
    <template v-slot:content3>
      <List3 :type='page.value' :dataList="dataList" />
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
  useRouter,
  channels
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import List3 from "./components/list3.vue"
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
    List3
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
    const router: any = useRouter();
    const channelData: any = channels();
    const coding: any = channels().coding.art;
    const dataList: any = ref([])
    const aaa: any = ref([])
    let menu: any = ref([{
        name: "文档管理",
        value: "appstore1"
      },
      {
        name: "正在审核",
        value: "appstore2"
      },
      {
        name: "已退回",
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

      // 聚合标签
      store.dispatch('common/Fetch', {
        api: "getTagCheckbox",
        data: {
          channel_id: channelData.id,
          type: 'art'
        }
      }).then(res => {
        aaa.value = res.result
      })

      const {
        type
      }: any = route.query

      store.dispatch('common/Fetch', {
        api: "articleList",
        data: {
          coding,
          management_checked: type === '2' ? -1 : type === '1' ? 0 : 1, // 是否审核,
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result
        dataList.value.map((item: any) => {
          let ssiss = item.flags.split("|")
          item.checkboxList = ssiss.slice(1, ssiss.length - 1)
        })

      })
    }

    function handleClick(params: any) {
      let url = `/admin/${channelData.module}/list/detail`
      if (params !== 'add') {
        url = url + `&id=${params.id}`
      }

      router.push(url)
    }

    onMounted(init)

    return {
      coding,
      dataList,
      channelData,
      page,
      menu,
      type,
      handleClick,
      aaa
    }
  }
})
</script>

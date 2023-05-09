<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra>
      <v-space>
        <v-search :render="init" />
        <v-toggledisplay v-model:toggle="toggleDisplay" />
        <v-condition name="排序" icon="sort" field="sorter" :enums="[{value: 'id desc', name: '递减'}, {value: 'id asc', name: '递增'}]" :render="init" />
        <Detail action='add' :data="channelData.coding" :render="init" :auth="true" />
      </v-space>
    </template>
    <template v-slot:content1>
      <List :type='page.value' :data="{...channelData, coding, aaa}" :render="init" v-if="toggleDisplay === 'list'" :auth="auth" />
    </template>
    <template v-slot:content2>
      <List2 :type='page.value' :data="{...channelData}" :render="init" :auth="auth" />
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
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
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
    const router: any = useRouter();
    const channelData: any = channels();
    const coding: any = channels().coding;
    const aaa: any = ref([])
    const toggleDisplay: any = ref("list")

    let menu: any = ref([{
        name: "网站管理",
        value: "appstore1"
      },
      {
        name: "正在审核",
        value: "appstore2"
      }
    ])

    if (channelData.module === 'picture') {
      menu.value[0].name = "图片管理"
      toggleDisplay.value = 'album'
    } else if (channelData.module === 'video') {
      menu.value[0].name = "视频管理"
    } else if (channelData.module === 'website') {
      menu.value[0].name = "网站管理"
      toggleDisplay.value = 'album'
    } else if (channelData.module === 'source') {
      menu.value[0].name = "资源管理"
    } else if (channelData.module === 'funny') {
      menu.value[0].name = "搞笑段子"
    }

    let page: any = ref(visitPage[0])
    let type: any = ref(1)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      type.value = qq.type
      init({
        page: 1,
        pagesize: 30
      })
    })

    function init(param: any) {
      const params: any = {
        page: 1,
        pagesize: 30
      }

      Object.assign(params, param)

      const {
        type
      }: any = route.query
      store.dispatch('channel/articleListAction', {
        api: "articleList",
        tabsIndex: route.query.type === undefined ? 0 : route.query.type ,
        module: channelData.module,
        data: {
          coding: coding.art,
          management_checked: type === '2' ? -1 : type === '1' ? 0 : 1, // 是否审核,
          ...params
        }
      })
    }

    function handleClick(param: any) {
      let url = `/admin/${channelData.module}/list/add`
      if (param !== 'add') {
        url = url + `&id=${param.id}`
      }

      router.push(url)
    }

    onMounted(() => {
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

      init({
        page: 1,
        pagesize: 30
      })
    })

    return {
      coding,
      init,
      channelData,
      page,
      menu,
      type,
      handleClick,
      aaa,
      toggleDisplay,
      auth: proxy.$auth.init(`channel/${channelData.module}/art`)
    }
  }
})
</script>

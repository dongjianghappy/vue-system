<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra>
      <v-space>
        <span class="pt10">
          <v-search :render="init" />
        </span>
        <v-condition name="排序" icon="sort-desc" field="sorter" :enums="[{value: 'id desc', name: '递减'}, {value: 'id asc', name: '递增'}]" :render="init" />
        <v-toggledisplay v-model:toggle="toggleDisplay" />
        <v-button @onClick="handleClick('add')" :disabled="auth.checked('add')" v-if="channelData.module !=='video'">
          <i class="iconfont icon-anonymous-iconfont" />新增文档
        </v-button>
        <uploadVideo v-else />
      </v-space>
    </template>
    <template v-slot:content1>
      <List :type='page.value' :data="{...channelData, coding, aaa}" :render="init" v-if="toggleDisplay === 'list'" :loading="loading" :auth="auth" />
      <Album :data="{...channelData, coding, aaa}" :render="init" v-else-if="channelData.module !=='video'" :loading="loading" :auth="auth" />
      <Video :data="{...channelData, coding, aaa}" :render="init" v-else-if="channelData.module === 'video'" :loading="loading" :auth="auth" />
    </template>
    <template v-slot:content2>
      <List2 :type='page.value' :data="{...channelData}" :render="init" :loading="loading" :auth="auth" />
    </template>
    <template v-slot:content3>
      <List3 :type='page.value' :data="{...channelData}" :loading="loading" :auth="auth" />
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
import Album from "./components/album.vue"
import Video from "../video/index.vue"
import uploadVideo from '../video/components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
    List3,
    Album,
    Video,
    uploadVideo
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
    const loading: any = ref(false)
    const pagesize: any = 10

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
    watch(router.currentRoute, (newValues, prevValues) => {
      if (newValues.path === prevValues.path) {
        let qq: any = route.query
        type.value = qq.type
        init({
          page: 1
        })
      }
    })

    function init(param: any) {

      const sssss: any = {
        page: 1,
        pagesize: pagesize
      }

      Object.assign(sssss, param)
      const {
        type
      }: any = route.query

      loading.value = false
      store.dispatch('channel/articleListAction', {
        api: "articleList",
        tabsIndex: route.query.type === undefined ? 0 : route.query.type,
        module: channelData.module,
        data: {
          coding: coding.art,
          management_checked: type === '2' ? -1 : type === '1' ? 0 : 1, // 是否审核,
          ...sssss
        }
      }).then(res => {
        loading.value = true
      })
    }

    function handleClick(params: any) {
      let url = `/admin/${channelData.module}/list/add`
      if (params !== 'add') {
        url = url + `&id=${params.id}`
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
        page: 1
      })
    })

    return {
      coding,
      loading,
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

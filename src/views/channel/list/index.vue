<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsArticle">
    <template v-slot:extra>
      <v-space>
        <span class="pt10">
          <v-search :render="init" />
        </span>
        <Tag :data="{ channel: channelData }" />
        <v-timepicker :data="detail" attr="start_time" @changeDay="changeDay" />
        <v-catepicker :data="{coding, module: channelData.module}" @choose="chooseCate" />
        <v-condition name="排序" icon="sort-desc" field="sorter" :enums="[{value: 'id desc', name: '递减'}, {value: 'id asc', name: '递增'}, {value: 'checked desc', name: '开启'}, {value: 'checked asc', name: '关闭'}]" :render="init" />
        <v-colorpicker2 @choose="chooseColor" />
        <v-toggledisplay v-model:toggle="toggleDisplay" />
        <ArticleDetail :data="{channel: channelData, coding}" :render="init" v-if="channelData.module ==='article' || channelData.module ==='tech' || channelData.module ==='topic'" />
        <PictureDetail :data="{channel: channelData, coding}" :render="init" v-else-if="channelData.module ==='picture'" />
        <SourceDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='source'" />
        <DesignDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='design'" />
        <OfficeDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='office'" />
        <WebsiteDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='website'" />
        <WordsDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='words'" />
        <DigitalDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='digital'" />
        <FunnyDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='funny'" />
        <NotesDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='notes'" />
        <DocumentDetail :data="{channel: channelData,coding}" :render="init" v-else-if="channelData.module ==='document'" />
        <VideoDetail :data="{channel: channelData,coding}" v-else />
      </v-space>
    </template>
    <template v-slot:content1 v-if="channelData.module !== 'digital'">
      <List :type='page.value' :data="{channel: channelData, coding, aaa}" :render="init" v-if="toggleDisplay === 'list'" :loading="loading" :auth="auth" />
      <Album :data="{channel: channelData, coding, aaa}" :render="init" :loading="loading" :auth="auth" v-else  />
    </template>
    <template v-slot:content1 v-else>
      <DigitalList :data="{channel: channelData, coding, aaa}" :render="init" :loading="loading" :auth="auth" :type="channelData.module" />
    </template>
    <template v-slot:content2>
      <List2 :type='page.value' :data="{channel: channelData, coding}" :render="init" :loading="loading" :auth="auth" />
    </template>
    <template v-slot:content3>
      <List3 :type='page.value' :data="{channel: channelData, coding}" :loading="loading" :auth="auth" />
    </template>
  </v-tabs>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  useRoute,
  useRouter,
  useStore,
  channels
} from '@/utils'
import {
  tabsArticle,
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import List3 from "./components/list3.vue"
import Album from "./components/album.vue"
import Video from "../video/index.vue"
import ArticleDetail from '../detail/articleDetail.vue'
import PictureDetail from '../detail/pictureDetail.vue'
import VideoDetail from '../detail/videoDetail.vue'
import FunnyDetail from '../detail/funnyDetail.vue'
import NotesDetail from '../detail/notesDetail.vue'
import SourceDetail from '../detail/sourceDetail.vue'
import WebsiteDetail from '../detail/websiteDetail.vue'
import DesignDetail from '../detail/designDetail.vue'
import OfficeDetail from '../detail/officeDetail.vue'
import WordsDetail from '../words/components/detail.vue'
import DigitalList from '../digital/index.vue'
import DigitalDetail from '../digital/components/detail.vue'
import DocumentDetail from '../detail/documentDetail.vue'
import Tag from "../components/tag.vue"

const {
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
const currentComponent: any = ref("")
const fid: any = ref("")

const albumArray = ['picture', 'video', 'website']
const auth: any = proxy.$auth.init(`channel/${channelData.module}/art`)

if (albumArray.indexOf(channelData.module) > -1) {
  toggleDisplay.value = 'album'
}

let page: any = ref(visitPage[0])
let type: any = ref(1)

// 监听路由
watch(router.currentRoute, (newValues, prevValues) => {
  if (newValues.path === prevValues.path) {
    type.value = route.query
    init()
  }
})

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 50
  }

  Object.assign(params, param)
  
  if(fid.value !== ''){
    params.fid = `|${fid.value}|`
  }else{
    delete params.fid
  }
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
      ...params
    }
  }).then(res => {
    loading.value = true
  })
}

function handleClick(param: any) {
  let url = `/admin/${channelData.module}/list/add`
  if (param !== 'add') {
    url = url + `&id=${param.id}`
  }
  router.push(url)
}

function chooseColor(param: any) {
  init({
    color: param
  })
}

function changeDay(data: any) {
  init({
    year: data.fullYear,
    month: data.month,
    day: data.day
  })
}

function chooseCate(param: any) {
  fid.value = param
  init({
    fid: `|${param}|`,
  })
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

  init()
})
</script>

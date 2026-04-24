<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsArticle">
    <template v-slot:extra>
      <v-space>
        <span class="pt10">
          <v-search :render="init" />
        </span>
        <v-timepicker :data="detail" attr="start_time" @changeDay="changeDay" />
        <v-catepicker :data="{coding, module: channelData.module}" @choose="chooseCate" />
        <v-condition name="排序" icon="sort-desc" field="sorter" :enums="[{value: 'id desc', name: '递减'}, {value: 'id asc', name: '递增'}]" :render="init" />
        <WordsDetail :data="{channel: channelData,coding}" :render="init" />
      </v-space>
    </template>
    <template v-slot:content1>
      <List :type='page.value' :data="{channel: channelData, coding, aaa}" :render="init" :loading="loading" :auth="auth" />
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
import List2 from "../../channel/list/components/list2.vue"
import List3 from "../../channel/list/components/list3.vue"
import WordsDetail from '../../channel/detail/WordsDetail.vue'

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

const auth: any = proxy.$auth.init(`channel/${channelData.module}/art`)

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
    pagesize: 30
  }

  Object.assign(params, param)
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

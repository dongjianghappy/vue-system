<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsQuestions">
    <template v-slot:extra>
      <v-space>
        <span class="pt10">
          <v-search :render="init" />
        </span>
        <v-timepicker :data="detail" attr="start_time" @changeDay="changeDay" />
        <v-catepicker :data="{coding, module: channelData.module}" @choose="chooseCate" />
        <v-condition name="排序" icon="sort-desc" field="sorter" :enums="[{value: 'id desc', name: '递减'}, {value: 'id asc', name: '递增'}]" :render="init" />
        <v-colorpicker2 @choose="chooseColor" />
        <v-toggledisplay v-model:toggle="toggleDisplay" />
        <Detail :data="{channel: channelData, coding: channelData.coding}" :render="init" :auth="true" />
      </v-space>
    </template>
    <template v-slot:content1>
      <List :type='page.value' :data="{...channelData, channel: channelData, coding: channelData.coding, aaa}" :render="init" v-if="toggleDisplay === 'list'" :auth="auth" />
    </template>
    <template v-slot:content2>
      <List2 :type='page.value' :data="{channel: channelData, coding: channelData.coding}" :render="init" :auth="auth" />
    </template>
    <template v-slot:content3>
      <Answer :type='page.value' :data="{...channelData, coding: channelData.coding}" :render="init" :auth="auth" />
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
  channels
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage,
  tabsQuestions
} from '@/assets/const'
import List from "./components/list.vue"
import Answer from "./answer/index.vue"
import List2 from "../list/components/list2.vue"
import Detail from '../detail/qustionsDetail.vue'
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
    const auth: any = proxy.$auth.init(`channel/${channelData.module}/art`)

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
      if(type == '2'){
        return
      }
      store.dispatch('channel/articleListAction', {
        api: "articleList",
        tabsIndex: route.query.type === undefined ? 0 : route.query.type ,
        module: channelData.module,
        data: {
          coding: coding.art,
          management_checked: type === '0' ? 1 : 0, // 是否审核,
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
</script>

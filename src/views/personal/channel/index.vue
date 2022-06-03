<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu" type="vertical" :title="channel.name" icon="dot">
    <div class="module-head">
      <v-optionsbar :title="menu[tabsIndex].name">
        <template v-slot:extraright>
          <Detail :data="{ coding }" :render="init" />
        </template>
      </v-optionsbar>
    </div>
    <template v-slot:content1>
      <div class="module-wrap">
        <div class="module-head">
          <v-optionsbar title="已审核">
          </v-optionsbar>
        </div>
        <div class="module-content p15">
          <List :render="init" :dataList="dataList" :data="{ coding }" isPersonal="true" />
        </div>
      </div>
    </template>
    <template v-slot:content2>
      <div class="module-wrap">
        <div class="module-head">
          <v-optionsbar title="未审核">
          </v-optionsbar>
        </div>
        <div class="module-content p15">
          <List2 :render="init" :dataList="dataList" :data="{ coding }" />
        </div>
      </div>
    </template>
    <template v-slot:content3>
      <div class="module-wrap">
        <div class="module-head">
          <v-optionsbar title="被退回">
          </v-optionsbar>
        </div>
        <div class="module-content p15">
          <List3 :render="init" :dataList="dataList" :data="{ coding }" />
        </div>
      </div>
    </template>
    <template v-slot:content4>
      <Collect :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content5>
      <Comment :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content6>
      <Praise :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content7>
      <Download :render="init" :data="{ coding }" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch,
  ref,
  useRoute,
  useStore,
  codings,
  channelssss
} from '@/utils'
import Detail from './components/detail.vue'
import List from '../../channel/article/components/list.vue'
import List2 from '../../channel/article/components/list2.vue'
import List3 from '../../channel/article/components/list3.vue'
import Collect from '../../channel/collect/index.vue'
import Comment from '../../channel/comment/index.vue'
import Praise from '../../channel/praise/index.vue'
import Download from '../../channel/download/index.vue'

import {
  linkPage
} from '@/assets/const'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
    List3,
    Collect,
    Comment,
    Praise,
    Download,
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const channel: any = channelssss()
    const coding: any = codings['link'];
    const dataList: any = ref([])
    let menu: any = ref([{
        name: "已审",
        value: "appstore1"
      },
      {
        name: "未审",
        value: "appstore2"
      },
      {
        name: "退回",
        value: "appstore2"
      },
      {
        name: "收藏",
        value: "appstore1"
      },
      {
        name: "评论",
        value: "appstore2"
      },
      {
        name: "点赞",
        value: "appstore2"
      },
      {
        name: "下载",
        value: "appstore1"
      }
    ])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
        tabsIndex.value = route.query.type
        init()
    })

    // 初始化
    function init() {
      store.dispatch('common/Fetch', {
        api: "articleList",
        data: {
          coding: channel.coding.art,
          uid: route.query.uid,
          // management_checked: type === '2' ? -1 : type === '1' ? 0 : 1, // 是否审核,
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

    onMounted(init)

    return {
      coding,
      channel,
      dataList,
      menu,
      init,
      tabsIndex
    }
  }
})
</script>

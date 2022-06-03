<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu" type="vertical" title="微博" icon="dot">
    <div class="module-head">
      <v-optionsbar :title="menu[tabsIndex].name">
        <template v-slot:extraright>
          <Detail :data="{ coding }" :render="init" />
        </template>
      </v-optionsbar>
    </div>
    <template v-slot:content1>
      <activity :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content2>
      <Talk :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content3>
      <Collect :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content4>
      <Comment :render="init" :data="{ coding }" />
    </template>
    <template v-slot:content5>
      <Praise :render="init" :data="{ coding }" />
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
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import activity from '../../talk/activity/index.vue'
import Talk from '../../talk/list/index.vue'
import Collect from '../../talk/collect/index.vue'
import Comment from '../../talk/comment/index.vue'
import Praise from '../../talk/praise/index.vue'

import {
  linkPage
} from '@/assets/const'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    activity,
    Talk,
    Collect,
    Comment,
    Praise,
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['link'];
    let menu: any = ref([{
        name: "话题",
        value: "appstore1"
      },
      {
        name: "微博",
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
      }
    ])
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/link') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init() {
      const param: any = {
        coding,
        method: tabsIndex.value === "1" ? 1 : 0, // 是否出售1: 交换, 0: 出售
        apply_checked: tabsIndex.value === '2' ? 0 : 1, // 是否审核1: 审核, 0: 未审核
        page: 1,
        pagesize: 10
      }
      if (tabsIndex.value === '2') delete param.method
      store.dispatch('basic/linkAction', {
        tabsIndex: tabsIndex.value,
        data: {
          ...param
        }
      })
    }

    onMounted(init)

    return {
      coding,
      menu,
      init,
      tabsIndex
    }
  }
})
</script>

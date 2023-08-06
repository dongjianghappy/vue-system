<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="搜索词库">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-3">关键词</td>
        <td class="col-md-9">次数</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>{{item.word}}</td>
        <td>{{item.number}}</td>
      </tr>
    </table>
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
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
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List
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
    const coding: any = codings
    let menu: any = ref([{
        name: "今日搜索词",
        value: "advertisement2"
      },
      {
        name: "搜索词库",
        value: "advertisement3"
      }
    ])
    const pagesize: any = 10
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/search/keyword') {
        tabsIndex.value = route.query.type
        init({
          page: 1
        })
      }
    })

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        data: {
          coding: route.path.indexOf("talk") === -1  ? coding.search.word : coding.talk.search.word,
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
    onMounted(() => {
      init({
        page: 1
      })
    })

    return {
      dataList,
      tabsIndex,
      menu,
      init
    }
  }
})
</script>

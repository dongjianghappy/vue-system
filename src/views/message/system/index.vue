<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="系统消息">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" :auth="true" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-2">
      <tr>
        <td class="col-md-1"> 选择</td>
        <td class="col-md-7">消息标题 </td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">类型</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td><span @click="handleClick(item)">{{item.title}}</span></td>
        <td>{{item.times}}</td>
        <td>{{messageType[item.type]}}</td>
        <td></td>
      </tr>
    </table>
    <v-loading :loading="loading" :dataList="dataList" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, ...data }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" v-if="dataList && dataList.length > 0" :auth="auth" />
  </div>
</div>
</template>

<script lang="ts">
import {
  useRoute,
  useRouter
} from '@/utils';
import {
  message,
} from '@/assets/const'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  watch,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import {
  useStore,
} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
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
    const route = useRoute()
    const router = useRouter()
    const coding: any = codings.message.list
    const dataList: any = ref([])
    const messageType: any = message
    let arr = window.location.pathname.split("/")
    let type = arr[arr.length - 1]
    const pages = {
      all: "全部消息",
      unread: "未读消息",
      read: "已读消息"
    }

    const currentPage: any = ref("all")

// // 监听路由
    watch(route, (newValues, prevValues) => {
      let path = route.path
      currentPage.value = path.split("/")[4]
    })

    function init() {
      store.dispatch('common/Fetch', {

        data: {
          coding,
          page: 1,
          pagesize: 10,
          status: type !== 'all' ? type === 'unread' ? "1" : "0" : ""
        }
      }).then(res => {
        dataList.value = res.result.list || []
      })
    }

    function edit(param: any) {

    }

    function handleClick(param: any) {
      router.push(`/admin/service/message/detail?type=${type}&id=${param.id}`)
    }

    onMounted(init)

    return {
      coding,
      dataList,
      edit,
      handleClick,
      messageType,
      pages,
      currentPage,
      init
    }
  }
})
</script>

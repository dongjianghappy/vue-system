<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="留言板"></v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-6">内容</td>
        <td class="col-md-2">日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">回复</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td style="line-height: 35px;">
          <v-avatar :data="item" />{{item.nickname}}
        </td>
        <td>
          {{item.name}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding }" :auth="auth.checked('status')" />
        </td>
        <td>
          <Reply :data="{...item, coding}" api="delete" :render="init" :auth="auth.checked('reply')"></Reply>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
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
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Reply from './components/reply.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Reply
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['basic/messageBoard']);
    const coding: any = codings['service'].message_board.list

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)
      store.dispatch('basic/Fetch', {
        api: "messageBoard",
        state: 'messageBoard',
        data: {
          ...params
        }
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      init,
      auth: proxy.$auth.init('messageBoard')
    }
  }
})
</script>

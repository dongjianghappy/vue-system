<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="搜索用户">
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">用户</td>
        <td class="col-md-2 ">关键词</td>
        <td class="col-md-7">搜索时间</td>
        <td class="col-md-2">时间</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>{{item.nickname}}</td>
        <td>{{item.word}}</td>
        <td>
          {{item.list}}
          <span class="bg-eee mr5 mb5 plr5" style="display: inline-block;" v-for="(list, i) in item.lists" :key="i">{{list.time}}</span>
        </td>
        <td>{{item.times}}</td>
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
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import Calendar from "./components/calendar.vue"

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    Calendar
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

    function init(param: any={}) {
      const params: any = {
        page: 1,
        pagesize: 25
      }
      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: "talkSearchUser",
        data: {
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      dataList,
      init
    }
  }
})
</script>

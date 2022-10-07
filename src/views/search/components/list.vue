<template>
<table width="100%" class="table-striped table-hover col-left-1">
  <tr class="th">
    <td class="col-md-3">日期</td>
    <td class="col-md-3">关键词(个)</td>
    <td class="col-md-3">搜索次数(次)</td>
    <td class="col-md-3">用户(个)</td>
  </tr>
  <tr>
    <td>今日</td>
    <td>{{data.today && data.today.word}}</td>
    <td>{{data.today && data.today.search}}</td>
    <td>{{data.today && data.today.user}}</td>
  </tr>
  <tr>
    <td>昨日</td>
    <td>{{data.yesterday && data.yesterday.word}}</td>
    <td>{{data.yesterday && data.yesterday.search}}</td>
    <td>{{data.yesterday && data.yesterday.user}}</td>
  </tr>
  <tr>
    <td>本周</td>
    <td>{{data.week && data.week.word}}</td>
    <td>{{data.week && data.week.search}}</td>
    <td>{{data.week && data.week.user}}</td>
  </tr>
  <tr>
    <td>本月</td>
    <td>{{data.month && data.month.word}}</td>
    <td>{{data.month && data.month.search}}</td>
    <td>{{data.month && data.month.user}}</td>
  </tr>
  <tr>
    <td>历史最高</td>
    <td>{{data.max && data.max.word}}</td>
    <td>{{data.max && data.max.search}}</td>
    <td>{{data.max && data.max.user}}</td>
  </tr>
  <tr>
    <td>历史累计</td>
    <td>{{data.all && data.all.word}}</td>
    <td>{{data.all && data.all.search}}</td>
    <td>{{data.all && data.all.user}}</td>
  </tr>
</table>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();

    function init() {
        store.dispatch('common/Fetch', {
          api: "visitStatistics",
          data: {
          }
        }).then(res => {
          
        })
    }


    function handleclick() {
      context.emit('onClick')
    }

    onMounted(init)
    return {
      handleclick
    }
  }
})
</script>

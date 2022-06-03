<template>
<table width="100%" class="table-striped table-hover col-left-1">
  <tr class="th">
    <td class="col-md-3">日期</td>
    <td class="col-md-3">IP(个)</td>
    <td class="col-md-3">新独立IP(个)</td>
    <td class="col-md-3">浏览次数(PV)</td>
  </tr>
  <tr>
    <td>今日</td>
    <td>332</td>
    <td>332</td>
    <td>909</td>
  </tr>
  <tr>
    <td>昨日</td>
    <td>355</td>
    <td>354</td>
    <td>1025</td>
  </tr>
  <tr>
    <td>本周</td>
    <td>1352</td>
    <td>1347</td>
    <td>5968</td>
  </tr>
  <tr>
    <td>本月</td>
    <td>4040</td>
    <td>4018</td>
    <td>21237</td>
  </tr>
  <tr>
    <td>历史最高</td>
    <td>82481</td>
    <td>81850</td>
    <td>586769</td>
  </tr>
  <tr>
    <td>历史累计</td>
    <td>82481</td>
    <td>81850</td>
    <td>586769</td>
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
    style: {
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

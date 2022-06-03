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
    <td>{{today.ip}}</td>
    <td>{{today.nip}}</td>
    <td>{{today.pv}}</td>
  </tr>
  <tr>
    <td>昨日</td>
    <td>{{yesterday.ip}}</td>
    <td>{{yesterday.nip}}</td>
    <td>{{yesterday.pv}}</td>
  </tr>
  <tr>
    <td>本周</td>
    <td>{{week.ip}}</td>
    <td>{{week.nip}}</td>
    <td>{{week.pv}}</td>
  </tr>
  <tr>
    <td>本月</td>
    <td>{{month.ip}}</td>
    <td>{{month.nip}}</td>
    <td>{{month.pv}}</td>
  </tr>
  <tr>
    <td>历史最高</td>
    <td>{{max.ip}}</td>
    <td>{{max.nip}}</td>
    <td>{{max.pv}}</td>
  </tr>
  <tr>
    <td>历史累计</td>
    <td>{{all.ip}}</td>
    <td>{{all.nip}}</td>
    <td>{{all.pv}}</td>
  </tr>
</table>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
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

    const today = computed(() => {
      return store.getters['setting/visit1'].today || []
    });
    const yesterday = computed(() => {
      return store.getters['setting/visit1'].yesterday || []
    });
    const week = computed(() => {
      return store.getters['setting/visit1'].week || []
    });
    const month = computed(() => {
      return store.getters['setting/visit1'].month || []
    });
    const max = computed(() => {
      return store.getters['setting/visit1'].max || []
    });
    const all = computed(() => {
      return store.getters['setting/visit1'].all || []
    });

    function handleclick() {
      context.emit('onClick')
    }

    return {
      handleclick,
      today,
      yesterday,
      week,
      month,
      max,
      all
    }
  }
})
</script>

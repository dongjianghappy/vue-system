<template>
<table width="100%" class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">序号</td>
    <td class="col-md-9">来路域名</td>
    <td class="col-md-1">访问次数</td>
    <td class="col-md-1">占比</td>
  </tr>
   <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.domain}}</td>
    <td>{{item.nums}}</td>
    <td>{{item.ip}}</td>
  </tr>
</table>
<v-nodata :data="dataList || []" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
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
    const dataList = computed(() => {
      return store.getters['setting/domain1'] || []
    });
    function handleclick() {
      context.emit('onClick')
    }

    return {
      handleclick,
      dataList
    }
  }
})
</script>

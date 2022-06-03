<template>
<table width="100%" class="table-striped table-hover col-left-23">
  <tr class="th">
    <td class="col-md-2">浏览时间</td>
    <td class="col-md-4">页面来源</td>
    <td class="col-md-4">受访页面</td>
    <td class="col-md-1">ip</td>
    <td class="col-md-1">区域</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.datetime}}</td>
    <td>{{item.source_url}}</td>
    <td>{{item.url}}</td>
    <td>{{item.ip}}</td>
    <td>{{item.area}}</td>
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
      return store.getters['setting/visit3'].list || []
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

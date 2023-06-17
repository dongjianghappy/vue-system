<template>
<table class="table-striped table-hover col-left-234">
  <tr class="th">
    <td class="col-md-1">id</td>
    <td class="col-md-2">来路域名</td>
    <td class="col-md-3">来源地址</td>
    <td class="col-md-3">受访页面</td>
    <td class="col-md-1">系统</td>
    <td class="col-md-1">ip</td>
    <td class="col-md-1">访问时间</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.domain}}</td>
    <td>{{item.source_url}}</td>
    <td>{{item.url}}</td>
    <td>{{item.system}}</td>
    <td>{{item.ip}}</td>
    <td>{{item.datetime}}</td>
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
      return store.getters['setting/domain3'].list || []
    });
    return {
      dataList
    }
  }
})
</script>

<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">ID</td>
    <td class="col-md-9">IP</td>
    <td class="col-md-2">访问时间</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.id}}</td>
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
      return store.getters['setting/ip4'].list || []
    });
    return {
      dataList
    }
  }
})
</script>

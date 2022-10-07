<template>
<table width="100%" class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">id</td>
    <td class="col-md-9 ">关键词</td>
    <td class="col-md-2">搜索时间</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.word}}</td>
    <td>{{item.times}}</td>
    <td></td>
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
    dataList: {
      type: Object,
      default: () => {
        return []
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();

    return {}
  }
})
</script>

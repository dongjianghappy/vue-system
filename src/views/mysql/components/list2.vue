<template>
<table width="100%" class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1 align-center">选择</td>
    <td class="col-md-6">数据库表</td>
    <td class="col-md-1">大小</td>
    <td class="col-md-2">备份时间</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
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
        data: {
          coding: "S0003",
          page: 1,
          pagesize: 25
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

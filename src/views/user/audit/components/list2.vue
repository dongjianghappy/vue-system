<template>
<table width="100%" class="table-striped table-hover col-left-34">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-1">头像</td>
    <td class="col-md-2">会员账号</td>
    <td class="col-md-4">用户名</td>
    <td class="col-md-2">电子邮箱</td>
    <td class="col-md-2">注册时间</td>
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

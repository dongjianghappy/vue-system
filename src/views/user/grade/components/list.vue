<template>
<table width="100%" class="table-striped table-hover col-left-12">
  <tr class="th">
    <td class="col-md-2">功能名称</td>
    <td class="col-md-3">描述</td>
    <td class="col-md-1">访客</td>
    <td class="col-md-1">普通用户</td>
    <td class="col-md-1">高级用户</td>
    <td class="col-md-1">VIP</td>
    <td class="col-md-1">超级VIP</td>
    <td class="col-md-1">绑定状态</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.name}}</td>
    <td>{{item.description}}</td>
     <td><v-switch :data="{ item, field: 'visitors', coding: 'U0003' }" /></td>
        <td><v-switch :data="{ item, field: 'ordinary_member', coding: 'U0003' }" /></td>
        <td><v-switch :data="{ item, field: 'senior_member', coding: 'U0003' }" /></td>
        <td><v-switch :data="{ item, field: 'vip_member', coding: 'U0003' }" /></td>
        <td><v-switch :data="{ item, field: 'super_vip_member', coding: 'U0003' }" /></td>
    <td><i class="iconfont icon-right cl-green font18"></i></td>
    <td>
      <Detail action="edit"   />
    </td>
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
import Detail from './detail.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
Detail
  },
  props: {
    dataList: {
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

 

    function handleclick() {
      context.emit('onClick')
    }
    
    return {
      handleclick
    }
  }
})
</script>

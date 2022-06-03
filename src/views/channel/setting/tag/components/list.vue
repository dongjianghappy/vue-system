<template>
<table width="100%" class="table-striped table-hover col-left-3">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-1">顺序</td>
    <td class="col-md-3">标签名称</td>
    <td class="col-md-2">标签值</td>
    <td class="col-md-1">tag</td>
    <td class="col-md-3">icon标签</td>
    <td class="col-md-1">状态</td>
  </tr>
  
  <tr v-for="(item, index) in dataList" :key="index">
    <td><v-checkbox :checkedList="checkedList" :data="{ id: item.id}" /></td>
    <td><v-quick :value="item.sort" :data="{ id: item.id, field: 'sort', coding: data.coding }" :auth="true" /></td>
    <td>{{item.name}}</td>
    <td><v-quick :value="item.value" :data="{ id: item.id, field: 'value', coding: data.coding }" :auth="true" /></td>
    <td><v-quick :value="item.tag" :data="{ id: item.id, field: 'tag', coding: data.coding }" :auth="true" /></td>
    <td>
      <v-quick :value="item.icon" :data="{ id: item.id, field: 'icon', coding: data.coding }" :style="{width: '60px'}" :auth="true" />
      <v-quick :value="item.color" :data="{ id: item.id, field: 'color', coding: data.coding }" :style="{width: '80px'}" :auth="true" />
      <i :class="`iconfont icon-${item.icon}`"></i>
    </td>
    <td><v-switch :data="{ item, field: 'status', ...data }" :auth="true" /></td>
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
    data: {
      type: String,
      default: ""
    },    
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

<template>
<table width="100%" class="table-striped table-hover col-left-34">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-1">ID</td>
    <td class="col-md-4">名称</td>
    <td class="col-md-1"> 退回类型</td>
    <td class="col-md-3"> 退回原因</td>
    <td class="col-md-2">发布时间</td>
  </tr>
  <tr class="tr-list" v-for="(item, index) in dataList" :key="index">
    <td>
      <div><label class="ant-checkbox-wrapper"><span class="ant-checkbox"><input type="checkbox" class="ant-checkbox-input" value=""><span class="ant-checkbox-inner"></span></span></label></div>
    </td>
    <td>{{item.id}}</td>
    <td>{{item.title}}<i class="iconfont icon-img"></i><i class="iconfont icon-article"></i></td>
    <td>
      <div class="pointer">{{item.parent}}</div>
    </td>
    <td>{{item.times}}</td>

    <td>
      {{item.times}}
    </td>
  </tr>
</table>
<v-nodata :data="dataList || []" />
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

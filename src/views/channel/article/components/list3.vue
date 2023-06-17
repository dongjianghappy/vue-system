<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-5">名称</td>
    <td class="col-md-1"> 退回类型</td>
    <td class="col-md-3"> 退回原因</td>
    <td class="col-md-2">发布时间</td>
  </tr>
  <tr class="tr-list" v-for="(item, index) in dataList.list" :key="index">
    <td>
      <div><label class="ant-checkbox-wrapper"><span class="ant-checkbox"><input type="checkbox" class="ant-checkbox-input" value=""><span class="ant-checkbox-inner"></span></span></label></div>
    </td>
    <td>{{item.title}}<i class="iconfont icon-img"></i><i class="iconfont icon-article"></i></td>
    <td>
      <div class="pointer">{{item.reason_type}}</div>
    </td>
    <td>{{item.return_reason}}</td>
    <td>
      {{item.times}}
    </td>
  </tr>
</table>
<!-- <v-loading :loading="loading" :dataList="dataList.list || []" /> -->
<v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" :auth="auth" />

</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute,
  computed
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();

    const dataList = computed(() => {
      return store.getters[`channel/${props.data.module}`]['returnList']
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

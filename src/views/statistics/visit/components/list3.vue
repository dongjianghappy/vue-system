<template>
<table width="100%" class="table-striped table-hover col-left-23">
  <tr class="th">
    <td class="col-md-2">浏览时间</td>
    <td class="col-md-3">页面来源</td>
    <td class="col-md-3">受访页面</td>
    <td class="col-md-1">ip</td>
    <td class="col-md-3">区域</td>
  </tr>
  <tr v-for="(item, index) in data.list" :key="index">
    <td>{{item.datetime}}</td>
    <td>{{item.source_url}}</td>
    <td>{{item.url}}</td>
    <td>{{item.ip}}</td>
    <td>{{item.country}}-{{item.province}}-{{item.city}}</td>
  </tr>
</table>
<div class="mt15">

</div>
<!-- <el-pagination
  background
  layout="prev, pager, next"
  :page-size="25"
  :total="data.total"
  @size-change="changeSIze"
  @current-change="currentChange"
  >
</el-pagination> -->
<!-- <v-pagination :pagination="{total: dataList.pages, page: dataList.page ||  1, pagesize: 25}"  /> -->
<v-nodata :data="data || []" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRoute

} from '@/utils'
// import { ElPagination } from 'element-plus'
export default defineComponent({
  name: 'v-Search',
  components: {
// ElPagination
  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {

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

    const data = computed(() => {
      return store.getters['setting/visit3'] || []
    });

    function handleclick() {
      context.emit('onClick')
    }

    function changeSIze(page: any){
      props.render(page)
    }
    function currentChange(current: any){
      props.render({
        page: current
      })
    }

    return {
      handleclick,
      data,
      changeSIze,
      currentChange
    }
  }
})
</script>

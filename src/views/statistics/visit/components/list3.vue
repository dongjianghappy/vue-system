<template>
<table width="100%" class="table-striped table-hover col-left-23">
  <tr class="th">
    <td class="col-md-2">浏览时间</td>
    <td class="col-md-4">页面来源</td>
    <td class="col-md-3">受访页面</td>
    <td class="col-md-1">ip</td>
    <td class="col-md-2">区域</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td>{{item.datetime}}</td>
    <td>
      <div style="word-break: break-all;">{{item.source_url}}</div>
    </td>
    <td>{{item.url}}</td>
    <td>{{item.ip}}</td>
    <td>{{item.country}}-{{item.province}}-{{item.city}}</td>
  </tr>
</table>
<div class="mt15">

</div>
<v-nodata :data="dataList.list || []" />
<v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />
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

    const dataList = computed(() => {
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
      dataList,
      changeSIze,
      currentChange
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head p0">
    <span @click="handleShow(0)" class="mr15">列表查看</span>
    <span @click="handleShow(1)">日期查看</span>
  </div>
  <div class="module-content p15" style="overflow: inherit;">
    <div v-if="view === 0">
      <table class="table-striped table-hover col-left-23">
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
            <div style="word-break: break-all;">
              <span class="search p5 align_center font12" v-if="item.domain.indexOf('google') > -1">
                <img :src="require('@/assets/image/google.png')" class="left" style="width: 12px; height: 12px;">
                谷歌
              </span>
              <span class="search p5 align_center font12" v-else-if="item.domain.indexOf('baidu') > -1">
                <img :src="require('@/assets/image/baidu.png')" class="left" style="width: 12px; height: 12px;">
                百度
              </span>
              <span class="search p5 align_center font12" v-else-if="item.domain.indexOf('sogou') > -1">
                <img :src="require('@/assets/image/sogou.png')" class="left" style="width: 12px; height: 12px;">
                搜狗
              </span>
              <span class="search p5 align_center font12" v-else-if="item.domain.indexOf('so') > -1">
                <img :src="require('@/assets/image/360.png')" class="left" style="width: 12px; height: 12px;">
                360
              </span>
              <span class="search p5 align_center font12" v-else-if="item.domain.indexOf('bing') > -1">
                <img :src="require('@/assets/image/bing.png')" class="left" style="width: 12px; height: 12px;">
                必应
              </span>
              <span class="search p5 align_center font12" v-else-if="item.domain.indexOf('toutiao') > -1">
                <img :src="require('@/assets/image/toutiao.png')" class="left" style="width: 12px; height: 12px;">
                头条
              </span>
              <span class="search p5 align_center font12" v-else-if="item.domain.indexOf('sm') > -1">
                <img :src="require('@/assets/image/shenma.png')" class="left" style="width: 12px; height: 12px;">
                神马
              </span>
              {{item.source_url}}</div>
          </td>
          <td>
            <div style="word-break: break-all;">{{item.url}}</div>
          </td>
          <td>{{item.ip}}</td>
          <td>{{item.country}}-{{item.province}}-{{item.city}}</td>
        </tr>
      </table>
      <div class="mt15">

      </div>
      <v-nodata :data="dataList.list || []" />
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />
    </div>
    <v-calendar @changeMonth="changeMonth" height="90px" v-else>
      <template v-slot:default="row">
        <template v-for="(item, index) in calendarData" :key="index">
          <div class="p5 mb5 align_left font12 cl-white" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">
            <div class=" mb5 plr5" :class="item.status ? 'blue' : 'gray'" style="border-radius: 2px">浏览: {{item.pv || 0}}</div>
            <div class="mb5 plr5" :class="item.status ? 'red' : 'gray'" style="border-radius: 2px">IP: {{item.ip || 0}}</div>
            <!-- <div class="plr5" style="background: #ddd; border-radius: 2px; overflow: auto;">搜索:
              <div>
                 <div class="col-md-6" v-for="(data, i) in item.engine" :key="i">{{data}}</div>
              </div>
            </div> -->
          </div>
        </template>
      </template>
    </v-calendar>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRoute,
  ref

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
    const view: any = ref(0)
    const calendarData: any = ref([])

    const dataList = computed(() => {
      return store.getters['setting/visit3'] || []
    });

    function handleclick() {
      context.emit('onClick')
    }

    function changeSIze(page: any) {
      props.render(page)
    }

    function currentChange(current: any) {
      props.render({
        page: current
      })
    }
    
    function init(param: any) {
      store.dispatch('common/Fetch', {
        api: "Calendar",
        data: {
          type: 'visit',
          ...param
        }
      }).then((res: any) => {
        calendarData.value = res.result
        debugger
      })
    }

    function handleShow(data: any) {
      view.value = data
      if (data === 1) {
        let date: any = new Date()
        init({
          year: date.getFullYear(),
          month: date.getMonth()+1
        })
      }
    }

    function changeMonth(data: any) {
      debugger
      init({
        year: data.fullYear,
        month: data.month
      })
    }

    return {
      handleclick,
      dataList,
      changeSIze,
      currentChange,
      view,
      calendarData,
      handleShow,
      changeMonth
    }
  }
})
</script>

<style scoped>
.search {
  display: inline-block;
  background: #f1f1f1;
  border-radius: 50px;
  width: 50px;
  height: 23px;
  line-height: 14px;
}
.gray{
  background: #f8f8fa;
  color: #ccc;
}
.blue{
  background: #42a5f5;
  color: #fff;
}
.red{
  background: #ef5350;
  color: #fff;
}
</style>

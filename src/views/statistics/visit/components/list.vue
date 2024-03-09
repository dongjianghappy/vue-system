<template>
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
        <span v-if="isWebsite">
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
        </span>
        {{item.source_url}}
      </div>
    </td>
    <td>
      <div style="word-break: break-all;">{{item.url}}</div>
    </td>
    <td>{{item.ip}}</td>
    <td>{{item.country}}-{{item.province}}-{{item.city}}</td>
  </tr>
</table>
<div class="mt15 align_right">
  <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  useRoute,
  ref,
  codings,
  onMounted
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  setup(props, context) {
    const coding: any = codings
    const store = useStore();
    const route = useRoute();
    const isWebsite: any = ref(true)

    const dataList: any = ref({})

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)
      isWebsite.value = route.path.indexOf("talk") === -1 ? true : false
      store.dispatch('common/Fetch', {
        data: {
          coding: route.path.indexOf("talk") === -1 ? coding.statistics.list : coding.talk.statistics.list,
          ...params
        }
      }).then((res: any) => {
        res.result.list = res.result.list.map((item: any) => {
          let domain = ""
          if(item.source_url.indexOf("http://") > -1 || item.source_url.indexOf("https://") > -1){
            domain = item.source_url.split("//")[1]
            domain = domain.split("/")[0]
          }
          return {
            domain,
            ...item
          }
        })

        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      dataList,
      init,
      isWebsite
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

.gray {
  background: #f8f8fa;
  color: #ccc;
}

.blue {
  background: #42a5f5;
  color: #fff;
}

.red {
  background: #ef5350;
  color: #fff;
}
</style>

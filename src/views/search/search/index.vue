<template>
<div class="module-wrap">
  <!-- <div class="module-head">
    <ul class="search-button">
      <li>全部</li>
      <li>文章</li>
      <li>图片</li>
      <li>视频</li>
    </ul>
  </div> -->
  <div class="module-content plr15">
    <div class="mtb15">搜索关键词<span class="cl-red">{{route.query.q}}</span>，已为你找到以下结果，共{{dataList.total}}条数据</div>
    <div>
      <template v-for="(item, index) in dataList.list" :key="index">
        <div
          class="thum-wrap ptb15"
          style="display: block; border-bottom: 1px dashed #ebeef3"
          v-if="item.img && item.img.length >= 2">
          <div class="multiple-wrap mb10">
            <Detail :data="{...item, channel: {name: item.channel, id: item.channel_id, module: item.model}, coding: coding[item.model]}" />
          </div>
          <div style="display: flex">
            <div class="thum" v-for="(img, i) in item.img" :key="i">
              <a><img
                  src="/source/public/images/thumbnail.png"
                  onerror="this.src='/images/slideshow.png'"
                  style="width: 215px; height: 120px"
                />
              </a>
            </div>
            <div
              class="thum align_center"
              style="background-color: #f2f2f2; width: 215px; height: 120px; line-height: 120px"
            >
              点击更多
            </div>
          </div>
          <div class="content">
            <p class="footer">
              <span class="mr15">
                <a>{{item.parent}}</a>
              </span>
              <span class="mr15"> {{item.source}} </span>
              <span>
                {{item.times}}
              </span>
            </p>
          </div>
        </div>
        <div class="thum-wrap ptb15" style="border-bottom: 1px dashed #ebeef3" v-else>
          <div class="thum" v-if="item.img.length > 0">
            <a>
              <img
                src="/source/public/images/thumbnail.png "
                onerror="this.src='/images/slideshow.png'"
                style="width: 215px; height: 120px"
              />
            </a>
          </div>
          <div class="content">
            <div class="multiple-wrap mb10"><Detail :data="{...item, channel: {name: item.channel, id: item.channel_id, module: item.model}, coding: coding[item.model]}" /></div>
            <p class="multiple-wrap-2 mb5" style="line-height: 32px" v-html="item.summary"></p>
            <p class="footer label font12">
              <span class="mr15">{{item.channel}}</span>
              <span class="mr15">分类：{{item.parent}}</span>
              <span class="mr15">来源：
                <span v-if="item.method=='1'">转</span>
                <span v-else-if="item.method=='2'">原</span>
                <span v-else-if="item.method=='3'">搞</span>
                <span v-else>Ai</span>
              </span>
              <span class="mr15">时间：{{item.times}}</span>
              <span class="mr15">浏览：{{item.visit}}</span>
              <!-- <span class="mr15"> {{item.label}} </span> -->
            </p>
          </div>
        </div>

      </template>
    </div>
    <v-nodata :data="dataList.list" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings,
  useRoute
} from '@/utils'
import Detail from '../../data/components/detail.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute()
    const dataList: any = ref({});
    const coding: any = codings;
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('partner')

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)
      store.dispatch('basic/Fetch', {
        api: 'siteSearch',
        data: {
          search: route.query.q,
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })
</script>

<style lang="less" scoped>
.search-button{
  display: flex;
  li{
    background: #eee;
    margin-right: 10px;
    border-radius: 4px;
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
}
em{
  color: #ff0000;
}
</style>
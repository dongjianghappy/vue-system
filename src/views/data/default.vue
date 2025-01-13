<template>
{{detail}}
  <div class="m15 mtb5">微博数据总览</div>
  <div class="mb10" style="overflow: auto">
    <div class="col-md-3 p10">
      <Card :data="{title: '用户量', total: user.total, today: user.today, yestoday: user.yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '微博发布数', coding: coding.talk.art, total: talk.total, checked: talk.checked, today: talk.today, yestoday: talk.yestoday}" />
    </div>
    <!-- <div class="col-md-4 p10">
      <Card :data="{title: '赞评收数', value: 1}" />
    </div> -->
    <div class="col-md-3 p10">
      <Card :data="{title: '微博评论数', coding: coding.talk.comment, total: talk.comment, checked: talk.comment_checked, today: talk.comment_today, yestoday: talk.comment_yestoday}" :render="init" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '微博点赞数', total: talk.praise, today: talk.praise_today, yestoday: talk.praise_yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '微博收藏数', total: talk.collect, today: talk.collect_today, yestoday: talk.collect_yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '微博留言数', total: talk.messageBoard, today: talk.messageBoard_today, yestoday: talk.messageBoard_yestoday}" />
    </div>
    <!-- <div class="col-md-4 p10">
      <Card :data="{title: '文章阅读数', value: 1}" />
    </div> -->
    <div class="col-md-3 p10">
      <Card :data="{title: '微博搜索量', total: talk.search, today: talk.search_today, yestoday: talk.search_yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '微博访问量', total: talk.visit, today: talk.visit_today, yestoday: talk.visit_yestoday}" />
    </div>

  </div>
  <div class="m15 mt25 mb5">频道数据总览</div>
  <div class="mb10" style="overflow: auto">
    <div class="col-md-3 p10">
      <Card :data="{title: '频道内容总量', total: channel.total, checked: channel.checked, today: channel.today, yestoday: channel.yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '频道评论数', total: channel.comment, checked: channel.comment_checked, today: channel.comment_today, yestoday: channel.comment_yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '频道点赞数', total: channel.praise, today: channel.praise_today, yestoday: channel.praise_yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '频道收藏数', total: channel.collect, today: channel.collect_today, yestoday: channel.collect_yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '内容下载量', total: channel.download, today: channel.download_today, yestoday: channel.download_yestoday}" />
    </div>
    <!-- <div class="col-md-4 p10">
      <Card :data="{title: '文章阅读数', value: 1}" />
    </div> -->
    <div class="col-md-3 p10">
      <Card :data="{title: '网站搜索量', total: channel.search, today: channel.search_today, yestoday: channel.search_yestoday}" />
    </div>
    <div class="col-md-3 p10">
      <Card :data="{title: '频道访问量', total: channel.visit, today: channel.visit_today, yestoday: channel.visit_yestoday}" />
    </div>
  </div>
  <!-- <div class="m15 mt25 mb5">模块数据总览</div>
  <div class="mb10" style="overflow: auto">
    <div class="col-md-3 p10">
      <Card :data="{title: '模块内容总量', value: 2, yes: 1}" />
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { onMounted, computed, useStore, codings } from "@/utils";
import Card from './components/card.vue'
const store = useStore();
const coding = codings

const user: any = computed(() => store.getters['basic/dataCenterStatistics'].user || {});
const talk: any = computed(() => store.getters['basic/dataCenterStatistics'].talk || {});
const channel: any = computed(() => store.getters['basic/dataCenterStatistics'].channel || {});

// 初始化
function init() {
  store.dispatch("basic/dataCenterStatistics");
}
onMounted(init);
</script>

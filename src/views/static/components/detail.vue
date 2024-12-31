<template>
  <v-button v-model:show="isShow" :disabled="auth">
    <i
      class="iconfont icon-anonymous-iconfont"
    />自定义更新
  </v-button>
  <v-drawer
    ref="drawer"
    v-model:show="isShow"
    title="自定义更新"
    :style="{ width: 950 }"
    :hasfooter="false"
  >
    <template v-slot:content v-if="isShow">
      <table class="table-channel table-striped table-hover static-wrap">
        <tr
          v-for="(item, index) in data.dataList"
          :key="index"
          style="background-color: #fafafa"
        >
          <td style="width: 200px">
            <Card
              :title="`${item.name} - 首页`"
              :item="item"
              :data="{
                serve: data.serve,
                action: 'index',
                isChannel: 'false',
                model: item.value,
                fid: item.fid || '',
              }"
            />
          </td>
          <td style="width: 200px">
            <Card
              title="分类"
              :item="item"
              :data="{
                serve: data.serve,
                action: 'menu',
                isChannel: 'false',
                model: item.value,
                fid: item.fid || '',
              }"
            />
          </td>
          <td>
            <Card
              :title="item.name"
              :item="item"
              :data="{
                serve: data.serve,
                action: 'article',
                isChannel: 'false',
                model: item.value,
                id: `${item.limitStart}-${item.limitEnd}`,
                method: item.sort,
                total: item.limitEnd - item.limitStart,
              }"
              :isDetail="true"
              v-if="item.hasHtml"
            />
            <div class="card h100" v-else></div>
          </td>
        </tr>
      </table>
      <div class="mb10" v-for="(item, index) in enums" :key="index">
        <Card
          :title="item.name"
          :item="{}"
          :data="{
            serve: data.serve,
            action: 'custom',
            value: item.value,
            model: 'custom',
          }"
        />
      </div>
    </template>
  </v-drawer>
</template>

<script setup lang="ts">
import { defineProps, ref, useStore } from "@/utils";
import Card from "./card.vue";
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const isShow: any = ref(false);
const drawer: any = ref(null);
const enums: any = ref([
  {
    name: "书签页",
    value: "bookmark",
  },
  {
    name: "博客大全",
    value: "blog",
  },
  {
    name: "导航网址",
    value: "hao",
  },
  {
    name: "博客收录申请",
    value: "application_blog",
  },
  {
    name: "提交问题页",
    value: "questions",
  },
  {
    name: "投稿申请",
    value: "tougao",
  },
  {
    name: "投稿单页",
    value: "contribute",
  },
  {
    name: "友链申请页",
    value: "application_link",
  },
  {
    name: "搜索页",
    value: "search",
  },
  {
    name: "排行榜",
    value: "ranking",
  },
]);

</script>

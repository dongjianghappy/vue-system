<template>
  <div class="module-wrap">
    <div class="module-head">
      <v-optionsbar title="静态生成">
        <template v-slot:extraright v-if="auth.checked('server')">
          <v-space>
            <Detail :data="{ serve, dataList: currentKind }" />
            <v-popover
              :content="`服务器:${website[serve]}`"
              arrow="tb"
              offset="right"
              :move="-20"
              :keys="`static_${index}`"
            >
              <ul class="font14" style="display: block">
                <li
                  v-for="(item, index) in website"
                  :key="index"
                  style="height: 32px"
                  @click="handleSelectServer(index)"
                >
                  {{ item }}
                </li>
              </ul>
            </v-popover>
          </v-space>
        </template>
      </v-optionsbar>
    </div>
    <div class="module-content plr15 font12">
      <table class="table-channel table-striped table-hover static-wrap">
        <tr
          v-for="(item, index) in channel"
          :key="index"
          style="background-color: #fafafa"
        >
          <td style="width: 120px">
            <div class="card h100">
              {{ item.name }}
            </div>
          </td>
          <td>
            <Card
              title="首页"
              :item="item"
              :data="{ serve, action: 'index', model: item.model }"
            />
          </td>
          <td v-if="index === 0">
            <Card
              title="单页"
              :item="item"
              :data="{ serve, action: 'single', model: 'single' }"
            />
          </td>
          <td v-else>
            <Card
              title="栏目"
              :item="item"
              :data="{
                serve,
                action: 'menu',
                model: item.model,
                fid: item.fid || '',
              }"
            />
          </td>
          <td>
            <div class="flex" v-if="item.model === 'index'">
              <Card
                title="地图"
                :item="item"
                :data="{ serve, action: 'sitemap', model: 'single' }"
                class="mr5"
                style="flex: 1"
              />
              <Card
                title="标签"
                :item="item"
                :data="{
                  serve,
                  action: 'tag',
                  model: item.module,
                  channel_id: item.channel_id,
                  id: `${item.limitStart}-${item.limitEnd}`,
                  method: item.sort,
                  total: item.limitEnd - item.limitStart,
                }"
                class="ml5"
                style="flex: 1"
                :isDetail="true"
              />
            </div>
            <Card
              title="详情"
              :item="item"
              :data="{
                serve,
                action: 'article',
                model: item.model,
                id: `${item.limitStart}-${item.limitEnd}`,
                method: item.sort,
                total: item.limitEnd - item.limitStart,
              }"
              :isDetail="true"
              v-else
            />
          </td>
        </tr>
      </table>
      <v-nodata :data="channel" />
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
} from "@/utils";
import Card from "./components/card.vue";
import Detail from "./components/detail.vue";
const { proxy }: any = getCurrentInstance();
const store = useStore();
const website = computed(() => store.getters['basic/site'].popover);
const channel = computed(() => store.getters["common/channel"]);
const serve: any = ref("none");
const currentKind: any = ref([]);
const auth: any = proxy.$auth.init("statics");

function init() {
  store
    .dispatch("common/Channel", {
      api: "static",
    })
    .then((res: any) => {
      // 素材种类初始化
      res.result.map((item: any) => {
        if (item.model === "source") {
          currentKind.value = item.list.map((item: any) => {
            return {
              ...item,
              limitStart: "1",
              limitEnd: item.num,
              sort: "desc",
            };
          });
        }
      });
    });
}

function handleSelectServer(param: any) {
  serve.value = param;
}

onMounted(init);
</script>

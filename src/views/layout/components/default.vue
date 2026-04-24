<template>
  <div class="mb10" style="overflow: auto">
    <div class="col-md-3" style="padding-right: 8px">
      <div class="col-md-4">
        <v-statisticcard name="用户总量" :value="user.total || 0" />
      </div>
      <div class="col-md-4">
        <v-statisticcard name="昨日注册" :value="user.yesterday || 0" />
      </div>
      <div class="col-md-4">
        <v-statisticcard name="今日注册" :value="user.today || 0" />
      </div>
    </div>
    <div class="col-md-3" style="padding-right: 8px">
      <div class="col-md-4">
        <v-statisticcard name="累计览量" :value="statistics.total_visit || 0" />
      </div>
      <div class="col-md-4">
        <v-statisticcard
          name="昨日览量"
          :value="(statistics.yesterday && statistics.yesterday.pv) || 0"
        />
      </div>
      <div class="col-md-4">
        <v-statisticcard
          name="今日览量"
          :value="(statistics.today && statistics.today.pv) || 0"
        />
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px; padding-right: 8px">
      <div class="col-md-4">
        <v-statisticcard name="累计IP" :value="statistics.total_ip || 0" />
      </div>
      <div class="col-md-4">
        <v-statisticcard
          name="昨日IP"
          :value="(statistics.yesterday && statistics.yesterday.ip) || 0"
        />
      </div>
      <div class="col-md-4">
        <v-statisticcard
          name="今日IP"
          :value="(statistics.today && statistics.today.ip) || 0"
        />
      </div>
    </div>

    <div class="col-md-3" style="padding-left: 8px">
      <div class="col-md-6">
        <v-statisticcard name="网站浏览" :value="website_sucai.visit || 0" />
      </div>
      <div class="col-md-6">
        <v-statisticcard name="博客浏览" :value="website_blog.visit || 0" />
      </div>
    </div>
  </div>
  <div class="mtb15">
    <span @click="handleClick" class="mr25">点击获取最新数据</span>
    <span class="mr25"><Website name="素材网站统计详情" :data="{website: 'yunxi10.com'}" /></span>
    <span class="mr25"><Website name="博客网站统计详情" :data="{website: 'dongblog.com'}" /></span>
  </div>
  <div class="mb10" style="overflow: auto">
    <div class="col-md-9" style="padding-right: 8px">
      <div class="module-wrap">
        <div class="module-head">今日与昨日访问量</div>
        <div class="module-content plr15" style="height: 645px">
          <ChartLine :chartData="hours.data" :chartOptions="hours.options" />
        </div>
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px">
      <div class="module-wrap">
        <div class="module-content plr15" style="height: 320px">
          <ChartPie :chartData="engine.data" :chartOptions="engine.options" />
        </div>
        <div class="p10 h100">
          <div v-for="(item, index) in engine.data.labels" :key="index" class="col-md-4 mb10 plr5">{{item}}</div>
        </div>
      </div>
      <div class="module-wrap">
        <div class="module-content p0" style="height: 260px">
          <ChartLine
            :chartData="register.data"
            :chartOptions="register.options"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="mb10" style="overflow: auto">
    <div class="col-md-5" style="padding-right: 8px">
      <div class="module-wrap">
        <div class="module-head">网页素材</div>
        <div class="module-content plr15" style="height: 320px">
          <ul>
            <li
              class="item-thum-wrap mb10"
              v-for="(item, index) in article"
              :key="index"
            >
              <div class="item-title relative pl40 pr40">
                <span class="num">{{ index + 1 }}</span
                >{{ item.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-4" style="padding-left: 8px">
      <div class="module-wrap">
        <div class="module-head">IT技术</div>
        <div class="module-content plr15" style="height: 320px">
          <ul>
            <li
              class="item-thum-wrap mb10"
              v-for="(item, index) in tech"
              :key="index"
            >
              <div class="item-title relative pl40 pr40">
                <span class="num">{{ index + 1 }}</span
                >{{ item.title }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-3" style="padding-left: 8px">
      <div class="module-wrap m0">
        <div class="module-head">关键词</div>
        <div class="module-content p0" style="height: 320px">
          <ul>
            <li
              class="item-thum-wrap mb10"
              v-for="(item, index) in wordList"
              :key="index"
            >
              <div class="item-title relative">
                <i class="iconfont icon-dot m0" />
                {{ item.word }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Website from './website.vue'
import { getCurrentInstance, onMounted, computed, useStore } from "@/utils";
import { ChartLine, ChartPie } from "@/components/packages/chart/index";
const store = useStore();
const {
  proxy
}: any = getCurrentInstance();
const user: any = computed(() => store.getters["basic/default"].user || {});
const statistics: any = computed(
  () => store.getters["basic/default"].statistics || {}
);
const website_sucai: any = computed(
  () => store.getters["basic/default"].website_sucai || {}
);
const website_blog: any = computed(
  () => store.getters["basic/default"].website_blog || {}
);
const hours: any = computed(() => {
  let aaa = store.getters["basic/default"].hours || {};
  return {
    data: {
      labels: aaa.label,
      series: [
        [...((aaa.value && aaa.value.today_online) || [])],
        [...((aaa.value && aaa.value.today_visit) || [])],
      ],
    },
    options: {
      title: ["今日浏览量", "昨日浏览量"],
      height: 400,
    },
  };
});

const visit: any = computed(() => {
  let aaa = store.getters["basic/default"].week || {};
  return {
    data: {
      labels: aaa.label,
      series: [[...((aaa.value && aaa.value.visit) || [])]],
    },
    options: {
      background: "#5ab25e",
      title: ["今日与昨日访问量"],
      height: 200,
    },
  };
});

// 搜索引擎
const engine: any = computed(() => {
  let aaa = store.getters["basic/default"].engine || {};
  return {
    data: {
      labels: aaa.labels,
      series: aaa.series,
    },
    options: {
      background: "#5ab25e",
      title: ["今日搜索"],
      height: 200,
    },
  };
});

const register: any = computed(() => {
  let aaa = store.getters["basic/default"].week || {};
  return {
    data: {
      labels: aaa.label,
      series: [[...((aaa.value && aaa.value.register) || [])]],
    },
    options: {
      background: "#e12d6c",
      title: ["一周注册量"],
      height: 200,
    },
  };
});

const tech: any = computed(() => store.getters["basic/default"].tech || []);
const article: any = computed(
  () => store.getters["basic/default"].article || []
);
const wordList: any = computed(
  () => store.getters["basic/default"].wordList || []
);

function handleClick(){
  init()
}
// 初始化
async function init() {
  setTimeout(() => {
    proxy.$hlj.message({
      msg: "正在获取数据"
    })
  }, 1000)
  await store.dispatch("basic/Default");
}
onMounted(() => {
  // init()
});
</script>

<template>
  <Space v-if="module === 'space'" />
  <Personal v-else-if="module === 'personal'" />
  <div class="layout" v-else>
    <Header @setRoute="setRoute" v-model:collapse="collapse" />
    <div class="layout" style="flex-direction: row">
      <div class="sidebar" :class="collapse ? 'w200' : 'w70'">
        <Sidebar :module="module" :collapse="collapse" />
      </div>
      <div class="layout relative" style="width: 1000px; height: auto;">
        <Position :setRoute="setRoute" />
        <div
          class="absolute p25 layout-main"
        >
          <Default v-if="path === '/admin' || path === '/admin/'" />
          <div v-else>
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <Index />
  </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watch,
  useRoute,
  useStore,
  useRouter,
  onMounted,
  codings
} from "@/utils";
import Index from './components/index.vue'
import Space from "../space/index.vue";
import Personal from "../personal/index.vue";
import Header from "./components/header/index.vue";
import Sidebar from "./components/sidebar/index.vue";
import Position from "./components/position/index.vue";
import Default from "./components/default.vue";
import VueEvent from "@/utils/event";
const module: any = ref(sessionStorage.getItem("sidebar") || "basic");
const store = useStore();
const router = useRouter();
const route = useRoute();
const collapse: any = ref(true);
const path: any = ref(route.path);
const coding: any = codings;

// 监听路由
watch(route, (newValues: any, prevValues) => {
  path.value = newValues.path;
});

store.dispatch("user/Detect").then((res) => {
  if (res) {
    sessionStorage.setItem("menuList", JSON.stringify(res.menuList));
    sessionStorage.setItem("gradeList", res.grade);
    sessionStorage.setItem("channel", JSON.stringify(res.channel));
    store.dispatch("permission/generateRoutes", [...res.menuList]);
  } else {
    router.push("/login");
  }
});

function setRoute(param: any) {
  module.value = param.module;
  sessionStorage.setItem("sidebar", param.module);
  router.push(`/admin/${param.path}`);
}

function getSite() {
  store.dispatch("basic/getWebsite", {
    data: {
      coding: coding.site.list,
    },
  })
}

onMounted(() => {
  getSite()
  module.value = window.location.pathname.split("/")[2] || "basic";
  sessionStorage.setItem("sidebar", module.value);
  VueEvent.on("reload", (data: any) => {
    setTimeout(() => {
      store
        .dispatch("common/Fetch", {
          api: "signOut",
        })
        .then((res) => {
          router.push(`/login`);
        });
    }, 3000);
  });
});
</script>
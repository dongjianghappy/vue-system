<template>
  <div class="position-wrap p0">
    <div class="position-dir">
      <div><v-scrolltext :dataList="messageList" /></div>
    </div>
    <ul class="position-nav">
      <li title="扩展">
        <i
          class="iconfont icon-more font18"
          @click="handleRouter('appstore', 'setting')"
        ></i>
      </li>
      <li title="数据中心">
        <i
          class="iconfont icon-vote font18"
          @click="handleRouter('data', 'data')"
        ></i>
      </li>
      <li title="设置">
        <SystemSetting :auth="true" :data="{ coding }" />
      </li>
      <li title="模块">
        <Module :router="handleRouter" />
      </li>
      <li title="频道">
        <Channel :router="handleRouter" />
      </li>
      <li title="功能">
        <More :router="handleRouter" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, useStore, codings, onMounted, ref } from "@/utils";
import SystemSetting from "@/components/packages/setting/systemSetting.vue";
import Channel from "../../../channel/components/channel.vue";
import Module from "../../../module/components/module.vue";
import More from "./components/more.vue";

import { MODUDLE } from "@/assets/const";
const props: any = defineProps({
  setRoute: {
    type: Function,
    default: () => {
      return;
    },
  },
});
const store = useStore();
const coding: any = codings;
const module: any = MODUDLE;
const messageList: any = ref([]);
const channel = computed(() => store.getters["user/channel"]);
const setting = computed(() => store.getters["user/setting"]);

function handleRouter(param: any, module: any) {
  props.setRoute({
    path: param,
    module: module || param,
  });
}

function init() {
  store
    .dispatch("common/Fetch", {
      api: "scrollMessage",
    })
    .then((res) => {
      messageList.value = res.result;
    });
}

onMounted(() => {
  init();
});
</script>

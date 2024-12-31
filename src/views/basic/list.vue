<template>
  <v-basicinfo
    v-model:dataList="dataList"
    :edit="edit"
    title="基本信息"
    :auth="auth"
  />
  <!-- <v-basicinfo v-model:dataList="dataList.logo" :edit="edit" title="网站LOGO" :auth="auth" />
<v-basicinfo v-model:dataList="dataList.custom" :edit="edit" title="自定义管理" :isDelete="true" :render="init" :data="{coding: coding.config}" :auth="auth" /> -->
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  onMounted,
  computed,
  useStore,
  codings,
  ref,
} from "@/utils";
import Detail from "./components/detail.vue";
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const { proxy }: any = getCurrentInstance();
const store = useStore();
const coding: any = codings;

const dataList = computed(() => store.getters["website/webinfo"]);

function init() {
  store.dispatch("website/BasicInfo", {
    website: props.data.id,
    coding: coding.config,
  });
}

function edit(param: any) {
  let params: any = {};
  param.map((item: any) => {
    params[item.name] = item.value;
  });

  store
    .dispatch("common/Fetch", {
      api: "updateInfo",
      data: {
        coding: coding.config,
        ...params,
      },
    })
    .then((res) => {
      proxy.$hlj.message({
        msg: "编辑成功",
      });
    });
}

onMounted(init);
</script>

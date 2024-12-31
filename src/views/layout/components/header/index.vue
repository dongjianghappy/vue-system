<template>
  <div class="header">
    <div class="logo" @click="handleRouter('', 'basic')">
      <img
        alt="logo"
        src="/images/logo.svg"
        width="25"
        class="mr10 left"
        style="margin-top: 20px"
      />
      控制平台{{ channelData.name ? `- ${channelData.name}` : "" }}
    </div>
    <div class="header-wrap">
      <div class="header-left">
        <ul>
          <li @click="handleclick">
            <i
              class="iconfont font20"
              :class="`icon-menu-${collapse ? 'fold1' : 'unfold'}`"
            ></i>
          </li>
          <li style="flex: 1; line-height: 16px; padding-top: 16px">
            <Search />
          </li>
        </ul>
      </div>
      <div class="header-right" style="width: 440px">
        <ul>
          <li class="plr15" style="width: 100px; line-height: 64px">
            <v-play
              :userInfo="userInfo"
              :router="handleRouter"
              :hasMusicList="true"
            />
          </li>
          <li style="flex: 1">
            <v-popover
              :content="userInfo.nickname"
              arrow="tb"
              offset="right"
              :move="-20"
              :keys="`static_${index}`"
            >
              <ul class="font14 cl-333 p15" style="display: block">
                <li style="height: 32px">
                  <a
                    :href="`http://www.dongblog.com/u/${userInfo.account}?token=${token}`"
                    target="_brank"
                    >个人中心</a
                  >
                </li>
                <li @click="routing('signOut')">退出</li>
              </ul>
            </v-popover>
            <v-avatar :data="userInfo" style="margin-top: 16px" />
          </li>
          <li class="mr15 relative" style="width: 50px">
            <Message :router="handleRouter" />
          </li>
          <li style="width: 50px">风格</li>
          <li style="width: 50px">
            <a href="http://www.yunxi10.com" target="_blank">首页</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  useStore,
  useRouter,
  useRoute,
  channels,
} from "@/utils";
import Search from "./Search.vue";
import Message from "./Message.vue";
const emit = defineEmits(["setRoute", "update:collapse"]);
const props: any = defineProps({
  collapse: {
    type: String,
    default: true,
  },
});
const store = useStore();
const channelData: any = ref(channels());
const router = useRouter();
const route = useRoute();
const userInfo = computed(() => store.getters["user/userInfo"]);
const token = computed(() => store.getters["user/token"]);

// 监听路由
watch(route, (newValues, prevValues) => {
  channelData.value = channels();
});

function handleRouter(param: any, module: any) {
  emit("setRoute", {
    path: param,
    module: module,
  });
}

function handleclick(param: any) {
  emit("update:collapse", !props.collapse);
}
// 路由跳转
function routing(param: any) {
  if (param === "signOut") {
    store
      .dispatch("common/Fetch", {
        api: "signOut",
      })
      .then((res) => {
        router.push(`/login`);
      });
  }
}
</script>

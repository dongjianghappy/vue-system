<template>
<div style="background: #001529; position: inherit;">
  <div class="logo" @click="handleRouter('', 'basic')">
    <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" width="25" class="mr10 left" style="margin-top: 20px;" />
    控制平台{{channelData.name ? `- ${channelData.name}` : ""}}
  </div>
  <div class="header-wrap">
    <div class="header-left">
      <ul style="display: flex; line-height: 64px;">
        <li class="align_center" style="width: 80px;" @click="handleclick">
          <i class="iconfont font20" :class="`icon-menu-${collapse ? 'fold1' : 'unfold'}`"></i>
        </li>
        <li style="flex: 1; line-height: 16px; padding-top:16px">
          <Search />
        </li>
      </ul>
    </div>
    <div class="header-right">
      <ul style="display: flex; line-height: 64px;">
        <li style="flex: 1">
          <Popover :content="userInfo.nickname" arrow="tb" offset="right" :move="-20" :keys="`static_${index}`">
            <ul class="font14 cl-333" style="display: block">
              <li style="height: 32px" @click="handleSelectServer(`/admin/collection/list?fid=${item.id}&name=${item.name}`)">个人中心</li>
              <li @click="routing('signOut')">退出</li>
            </ul>
          </Popover>
          <v-avatar :data="userInfo" style="margin-top: 16px;" />
        </li>
        <li class="mr15" style="width: 50px;">
          <span>消息<span class="badge"><sup class="number">0</sup></span></span></li>
        <li style="width: 50px;">风格</li>
        <li style="width: 50px;"><a href="http://www.yunxi10.com" target="_blank">首页</a></li>
        <li style="width: 50px;">旧版本</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  watch,
  useStore,
  useRouter,
  useRoute,
  getUid,
  channels
} from '@/utils'
import {
  basicInfo,
  information
} from '@/assets/const'
import Search from './Search.vue'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Header',
  components: {
    Search,
    Popover
  },
  emits: ['setRoute', 'update:collapse'],
  props: {
    collapse: {
      type: String,
      default: true
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const channelData: any = ref(channels());
    const router = useRouter();
    const route = useRoute();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const menu: any = basicInfo;
    const messge: any = information;

    // 监听路由
    watch(route, (newValues, prevValues) => {
      channelData.value = channels()
    })

    function handleRouter(param: any, module: any) {
      context.emit('setRoute', {
        path: param,
        module: module
      })
    }

    function handleclick(param: any) {
      context.emit('update:collapse', !props.collapse)
    }
    // 路由跳转
    function routing(param: any) {
      if (param === 'signOut') {
        store.dispatch('common/Fetch', {
          api: "signOut"
        }).then(res => {
          router.push(`/login`)
        })
      }
    }
    return {
      loginuser,
      userInfo,
      channelData,
      menu,
      messge,
      handleRouter,
      handleclick,
      routing
    }
  }
})
</script>

<style scoped>
.header {
  min-height: 60px;
  line-height: 60px;
  height: 64px;
}

.logo {
  box-shadow: #2f455a 1px 0px 3px;
  padding-left: 25px;
  width: 199px;
  height: 64px;
  line-height: 64px;
  float: left;
  font-size: 18px;
  color: #fff !important;
}

.header-wrap {
  display: flex;
  flex: 1;
}

.header-wrap .header-left {
  flex: 1;
  justify-content: space-between;
}

.header-wrap .header-right {
  width: 350px;
  color: #fff;
}

.header-wrap .header-right .dropDwon {
  width: 120px;
  color: #fff !important;
}
</style>

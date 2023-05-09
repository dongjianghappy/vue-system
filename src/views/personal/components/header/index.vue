<template>
<div style="background: #001529; position: inherit;">
  <div class="logo" >
    <v-avatar :data="userInfo" style="margin-top: 16px;" />
    {{userInfo.nickname}}
  </div>
  <div class="header-wrap">
    <div class="header-left">
      <ul style="display: flex; line-height: 64px;">
        <li class="align_center" style="width: 80px;" @click="handleclick">
          <i class="iconfont font20" :class="`icon-menu-${collapse ? 'fold1' : 'unfold'}`"></i>
        </li>
        <li style="flex: 1; line-height: 16px; padding-top:16px">
          <!-- <Search /> -->
        </li>
      </ul>
    </div>
    <div class="header-right" style="width: 80px">
      <ul style="display: flex; line-height: 64px;">
        <li style="width: 80px;"><span @click="handleRouter('', 'basic')">管理平台</span></li>
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
export default defineComponent({
  name: 'v-Header',
  components: {
    Search
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

    return {
      loginuser,
      userInfo,
      channelData,
      menu,
      messge,
      handleRouter,
      handleclick
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

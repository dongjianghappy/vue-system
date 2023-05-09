<template>
<div style="background: #001529; position: inherit;">
  <div class="logo" @click="handleRouter('', 'basic')">
    图片空间
  </div>
  <div class="header-wrap">
    <div class="header-left">
      
    </div>
    <div class="header-right">
      
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
  useStore,
  useRouter,
  getUid
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
    const router = useRouter();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const menu: any = basicInfo;
    const messge: any = information;



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

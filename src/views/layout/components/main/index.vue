<template>
<div>
  <Default v-if="path === '/admin' || path === '/admin/'" />
  <div v-else>
    
    <router-view />
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
  useRoute,
  useRouter,
  getUid
} from '@/utils'
import {
  basicInfo,
  information
} from '@/assets/const'

import Default from '../default.vue'
export default defineComponent({
  name: 'v-Header',
  components: {
    Default
  },
  props: {
    setRoute: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const channel = computed(() => store.getters['user/channel']);
    const menu: any = basicInfo;
    const messge: any = information;
    const isShow: any = ref(false)
    const path: any = ref(route.path)

 

    function handleclick(param: any) {

      isShow.value = !isShow.value
    }

    // 路由跳转
    function routing(param: any) {
      if (param === 'signOut') {
        store.dispatch('common/Fetch', {
          api: "signOut"
        }).then(res => {
          router.push(`/login`)
        })
      } else {
        router.push(proxy.const.setUrl({
          uid: loginuser.value.account,
          query: param
        }))
      }
    }

    return {
      loginuser,
      userInfo,
      channel,
      menu,
      messge,
      isShow,
      handleclick,
      routing,
      path
    }
  }
})
</script>

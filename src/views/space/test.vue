<template>
<Index />
</template>

<script lang="ts">
// <router-view />
import {
  defineComponent,
  computed,
  ref,
  useStore,
  useRouter
} from '@/utils'
import Index from '../../components/common/OptionsBar.vue'

export default defineComponent({
  name: 'IndexView ',
  components: {
    Index
  },
  setup(props, context) {
    const module: any = ref(sessionStorage.getItem('sidebar') || "basic")
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.getters['user/userInfo']);
    const currentUser = computed(() => store.getters['user/currentUser']);
    const isLogin: any = ref(false)

    store.dispatch('user/Detect').then((res) => {
       
      if (res) {
        sessionStorage.setItem("menuList", JSON.stringify(res.menuList))
        store.dispatch('permission/generateRoutes', [
          ...res.menuList
        ])
      } else {
        router.push('/login')
      }
    })

    function setRoute(param: any){
      module.value = param
      sessionStorage.setItem('sidebar', param)
    }

    return {
      userInfo,
      isLogin,
      currentUser,
      module,
      setRoute
    }
  }
})
</script>

<style scoped>
.layout {
  display: flex;
  flex: auto;
flex-direction: column;
    min-height: 0;
    background: #f0f2f5;
    width: 100%;
    height: 100vh;
}
.sidebar{
  position: relative;
  box-shadow: rgb(0 21 41 / 8%) 0px 1px 4px;
    bottom: 0 !important;
  flex: 0 0 200px;
    max-width: 200px;
    min-width: 200px;
    width: 200px;
}
</style>

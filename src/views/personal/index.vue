<template>
<div class="layout">
  <Header @setRoute="setRoute" v-model:collapse="collapse" />

  <div class="layout" style="flex-direction: row;">

    <div class="sidebar" :class="collapse? 'w200': 'w70'">
      <Sidebar :module="module" :collapse="collapse" />
    </div>
    <div class="layout relative" style="height: auto">
      <Position :setRoute="setRoute" />
      <div class="absolute p25" style=" top:45px; bottom: 0; overflow: auto; width: 100%;">
        <Default v-if="path === '/admin' || path === '/admin/'" />
        <div v-else>

          <router-view />
        </div>
      </div>
    </div>
  </div>

  <!-- <router-view /> -->
</div>
</template>

<script lang="ts">
// <router-view />
import {
  defineComponent,
  computed,
  ref,
  watch,
  useRoute,
  useStore,
  useRouter,
  onMounted
} from '@/utils'
import Header from './components/header/index.vue'
import Sidebar from './components/sidebar/index.vue'
import Position from './components/position/index.vue'
export default defineComponent({
  name: 'IndexView ',
  components: {
    Header,
    Sidebar,
    Position
  },
  setup(props, context) {
    const module: any = ref(sessionStorage.getItem('sidebar') || "basic")
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const userInfo = computed(() => store.getters['user/userInfo']);
    const currentUser = computed(() => store.getters['user/currentUser']);
    const isLogin: any = ref(false)
    const collapse: any = ref(true)
    const path: any = ref(route.path)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      path.value = newValues.path
    })

    store.dispatch('user/Detect').then((res) => {
      if (res) {
        sessionStorage.setItem("menuList", JSON.stringify(res.menuList))
        sessionStorage.setItem("channel", JSON.stringify(res.channel))
        store.dispatch('permission/generateRoutes', [
          ...res.menuList
        ])
      } else {
        router.push('/login')
      }
    })

    function setRoute(param: any) {
      module.value = param.module
      sessionStorage.setItem('sidebar', param.module)
      router.push(`/admin/personal/${param.path}`)
    }

    onMounted(() => {
      module.value = window.location.pathname.split("/")[2] || "";
      sessionStorage.setItem('sidebar', module.value)
      router.push(window.location.pathname + window.location.search)
    })

    return {
      userInfo,
      isLogin,
      currentUser,
      module,
      setRoute,
      collapse,
      path
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
  height: 100vh;
}

.sidebar {
  position: relative;
  box-shadow: rgb(0 21 41 / 8%) 0px 1px 4px;
  bottom: 0 !important;
  max-width: 200px;
  transition: right .5s ease;
}
</style>

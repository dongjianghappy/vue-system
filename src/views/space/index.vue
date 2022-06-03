<template>
<div class="layout">
  <Header @setRoute="setRoute" v-model:collapse="collapse" />

  <div class="layout" style="flex-direction: row;">

    <div class="sidebar" :class="collapse? 'w200': 'w70'">
      <Sidebar :module="module" :collapse="collapse" />
    </div>
    <div class="layout relative" style="height: auto">
      <Main />
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
  useStore,
  useRouter
} from '@/utils'
import Header from './components/header/index.vue'
import Sidebar from './components/sidebar/index.vue'

import Main from './components/main/index.vue'
export default defineComponent({
  name: 'IndexView ',
  components: {
    Header,
    Sidebar,
    Main
  },
  setup(props, context) {
    const module: any = ref(sessionStorage.getItem('sidebar') || "basic")
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.getters['user/userInfo']);
    const currentUser = computed(() => store.getters['user/currentUser']);
    const isLogin: any = ref(false)
    const collapse: any = ref(true)

//     store.dispatch('user/Detect').then((res) => {
// debugger
//       if (res) {
//         debugger
//         sessionStorage.setItem("menuList", JSON.stringify(res.menuList))
//         store.dispatch('permission/generateRoutes', [
//           ...res.menuList
//         ])
//       } else {
//         router.push('/login')
//       }
//     })

    function setRoute(param: any) {
      module.value = param.module
      sessionStorage.setItem('sidebar', param.module)
      router.push(`/admin/${param.path}`)
    }

    return {
      userInfo,
      isLogin,
      currentUser,
      module,
      setRoute,
      collapse
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

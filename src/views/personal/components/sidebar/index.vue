<template>
<div class="bg-white w200 silde-wrap" style="height: 100%;">
  <div class="menus">TECHNOLOGY</div>
  <div class="aside" v-for="(item, index) in siderRouter" :key="index">
    <div class="aside-head" v-if="item.children" @click="handleShow(item)">
      <i class="iconfont" :class="`icon-${item.icon}`"></i> <i class="iconfont icon-arrow arrow " :class="item.isshow ? 'deg90' : ''"></i>
      <span v-if="collapse">{{item.meta.title}}</span></div>
    <div class="aside-list" v-if="item.children" v-show="item.isshow">
      <ul v-if="collapse">
        <li class="pl50 pointer" v-for="(list, i) in item.children" :key="i" @click="handleclick(list)">
          <span v-if="collapse">{{list.meta.title}}</span></li>
      </ul>
    </div>
    <div class="aside-list" v-else>
      <ul>
        <li class="pointer pl20" @click="handleclick(item)"><i class="iconfont" :class="`icon-${item.icon}`"></i> <span v-if="collapse">{{item.meta.title}}</span></li>
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
  watch,
  ref,
  useStore,
  useRouter,
  useRoute,
  getUid
} from '@/utils'
import {
  basicInfo,
  information
} from '@/assets/const'
export default defineComponent({
  name: 'v-Header',
  components: {},
  props: {
    module: {
      type: String,
      default: "basic"
    },
    collapse: {
      type: String,
      default: false
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const route = useRoute();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const menu: any = basicInfo;
    const messge: any = information;
    const siderRouter: any = ref([])

    watch([() => props.module], (newValues, prevValues) => {

      siderRouter.value = router.matcher.filter(
        (route: any) => route.module === props.module
      )
    })

    function init() {
      siderRouter.value = router.matcher.filter(
        (route: any) => route.module === props.module
      )
    }

    function handleclick(params: any) {
      router.push(`${params.path}?uid=${route.query.uid}`)
    }

    function handleShow(params: any) {
      siderRouter.value.map((item: any) => {
        if (item.id === params.id) {
          params.isshow = !params.isshow
        } else {
          item.isshow = false
        }
      })

    }

    onMounted(init)

    return {
      loginuser,
      userInfo,
      menu,
      messge,
      siderRouter,
      handleclick,
      handleShow,
      route
    }
  }
})
</script>

<template>
<div class="position-wrap" v-if="type !== 'modal'">
  <div class="position-dir pl15"></div>
  <ul class="position-nav">
    <li class="ant-col ant-col-2 pointer" @click="handleClick('return')">返回</li>
    <li class="ant-col ant-col-2 pointer" ><Detail :data="data" /></li>
    <li class="ant-col ant-col-2 pointer" > <Upload :data="data" /></li>
  </ul>
</div>
<div class="modal-position-wrap" v-else>
  <div class="position-dir pl15"></div>
    <ul class="modal-position-nav">
    <li class="ant-col ant-col-2 pointer" @click="handleClick('return')">返回</li>
  </ul>

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
  useRoute,
  getUid,
  watch
} from '@/utils'
import {
  basicInfo,
  information
} from '@/assets/const'
import {
  // Breadcrumb
} from '@/router/config'
import Detail from '../main/components/detail.vue'
import Upload from '../main/components/upload.vue'
export default defineComponent({
  name: 'v-Header',
  components: {Detail, Upload},
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
    emits: ['update:onClick'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const route = useRoute();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const userInfo = computed(() => store.getters['user/userInfo']);
    const channel = computed(() => store.getters['user/channel']);
    const menu: any = basicInfo;
    const messge: any = information;
    const isShow: any = ref(false)
    const Breadcrumbsssss: any = ref([])

    function handleClick(param: any) {
      props.data.render(param, props.data.prev)
    }

    
    return {
      loginuser,
      userInfo,
      channel,
      menu,
      messge,
      isShow,
      handleClick,
      Breadcrumbsssss
    }
  }
})
</script>

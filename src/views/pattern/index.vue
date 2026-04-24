<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsPattern">
    <template v-slot:extra>
      <v-space>
        <Detail :data="{ coding }" :render="init" :auth="false" />
      </v-space>
    </template>
    <template v-slot:content1>
      <Album :data="{ coding }" :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <Album :data="{ coding }" :dataList="dataList" />
    </template>
  </v-tabs>
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
  watch,
  codings
} from '@/utils'

import {
  tabsPattern
} from '@/assets/const'

import Detail from './components/detail.vue'
import Album from './components/album.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Detail,
    Album
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const dataList: any = ref([])
    const coding: any = codings.pattern;
    const checkedList: any = ref([])

    // 监听路由
    watch(router.currentRoute, (newValues, prevValues) => {
      if (newValues.path === prevValues.path) {
        init()
      }
    })

    function init() {
      const {
        type
      }: any = route.query
      store.dispatch('basic/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 100,
          type: type === '0' ? 0 : 1
        }
      }).then((res: any) => {
        dataList.value = res.result || []
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      tabsPattern,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

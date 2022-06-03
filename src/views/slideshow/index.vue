<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="幻灯片管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div><img @click="handleClick(item)" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" style="width: 100%"></div>
        <div class="ptb15">
          {{item.name}}
          <Detail action="edit" :data="{id: item.id, coding }" :param="param" :render="init" :auth="auth.checked('edit')" />
        </div>
      </div>
    </div>
    <v-nodata :data="dataList || []" />
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
  useRouter,
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  props: {},
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const dataList = computed(() => store.getters['basic/slideshow']);
    const coding: any = codings['slideshow'].cate;

    function init() {
      store.dispatch('basic/Fetch', {
        api: "slideshow",
        state: "slideshow"
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/slideshow/list?fid=${param.id}`)
    }

    onMounted(init)

    return {
      coding,
      dataList,
      handleClick,
      auth: proxy.$auth.init('slideshow/cate')
    }
  }
})
</script>

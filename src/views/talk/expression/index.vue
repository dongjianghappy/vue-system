<template>
<Cate title="背景特效" :data="{coding: coding.cate}" :render="init" />
<div class="module-wrap">
  <div class="module-content p15">
    <div class="mb15 font14">
      <span class="right">
        <ImportDetail action='add' :data="{coding: coding}" :render="init" />
      </span>
    </div>
    <div>
      <div class="col-md-1 p10" v-for="(item, index) in dataList" :key="index" :index="index">
        <div class="align_center" style="background: #f9f9f9;">
          <div class="p15 relative" style="height: 24px;">
            <span class="absolute" style="top: 0; right: 0"><v-status :data="{ item, field: 'checked', coding: coding.art }" /></span>
            <img :src="item.img" width="24" height="24" />
          </div>
          <div class="p15">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
    <v-nodata :data="dataList" />
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
  codings
} from '@/utils'
import Cate from './components/album.vue'
import Detail from './components/detail.vue'
import ImportDetail from './components/importDetail.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Cate,
    Detail,
    ImportDetail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const coding = codings.expression
    const dataList: any = ref([]);
    const checkedList: any = ref([])

    function init(param: any = {}) {
      const params: any = {}
      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: "emoticonsList",
        data: {
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

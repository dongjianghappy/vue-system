<template>
<div style="overflow: auto;">
  <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList.list" :key="index">

    <div class="thumbnail p10 relative" style="overflow: hidden;">
      <v-thumbnail :data="item" :coding="data.coding" :type="type" :getNeighbor="getNeighbor" :hasInfo="false" />
      <div class="caption relative" style="padding: 10px 0px; height: 40px;">
        <span class="inputline updata" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; ">{{item.name}}</span>
        <span>
          <Detail action="edit" :data="{id: item.id, coding: data.coding}" :param="param" :render="render" />
        </span>
      </div>
    </div>
  </div>

</div>
<v-nodata :data="dataList.list || []" />
<v-loading :loading="loading" :dataList="dataList.list || []" />
<v-buttongroup disabled="false" :data="{id: checkedList, coding: data.coding }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  channels,
  useRouter
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
import {
  setDevtoolsHook
} from '@vue/runtime-core';
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "image"
    },
    isPersonal: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter()
    const checkedList: any = ref([])
    const showFlag: any = ref(false)
    const index: any = ref(0)
    const currentData: any = ref({})
    const currentImg: any = ref()

    function showImg(param: any, i: any) {
      index.value = i
      currentData.value = param
      debugger
      currentImg.value = param.image[0]
      showFlag.value = !showFlag.value
    }

    return {
      checkedList,
      showFlag,
      index,
      currentImg,
      currentData,
      showImg
    }
  }
})
</script>

<style lang="less" scoped>
.thumbnail {
  background: rgb(255, 255, 255);

  &:hover {
    background: #f8f8fa;
  }
}
</style>

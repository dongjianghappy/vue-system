<template>
<div style="overflow: auto;">
  <!-- {{dataList}} -->
  <!-- <Three :data="dataList[1]" style="background: white; width: 100%; height: 460px;box-shadow: rgb(32 33 36 / 28%) 0px 0px 1px 0px;"></Three> -->
  <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
    <!-- <Three :data="item" style="background: white; width: 100%; height: 250px;box-shadow: rgb(32 33 36 / 28%) 0px 0px 1px 0px;"></Three> -->
    <!-- <div class="thumbnail p10 relative" style="background: var(--card-background); overflow: hidden;"> -->
      <!-- {{dataList}} -->
      <!-- <Three :data="dataList[1]" style="background: white; width: 100%; height: 460px;box-shadow: rgb(32 33 36 / 28%) 0px 0px 1px 0px;"></Three> -->
      <!-- <v-thumbnail :data="item" :type="type" :hasComment="true" /> -->
      <!-- <div class="
                 caption
                 relative" style="padding:10px 0; height:40px;">
        <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.title}}【{{item.image.length}}张】</span>
      </div>
    </div> -->
  </div>
  <!-- <v-nodata :data="dataList.list" />
  <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :pagination="{total: 10, page: 10, pagesize: 10}" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" :auth="auth" /> -->
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
  channels
} from '@/utils'
import Detail from './components/detail.vue'
// import Three from './components/three.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Detail,
    // Three
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = [
        { 
          "id": 0,
          "cameraNear": 0.25,
          "cameraFar": 20,
          "cameraPosition": [2.5, 1.5, 3.0],
          "cameraLookAt": [0, 0, 0],
          "gltfSceneScaleSet": [10.0, 10.0, 10.0],
          "controlsMinDistance": 2,
          "controlsMaxDistance": 10,
          "loaderSetPath": "/three/models/gltf/MaterialsVariantsShoe/glTF/",
          "loaderLoad": "MaterialsVariantsShoe.gltf",
          "controlsTargetSset": [0, 0.5, -0.2],
          "color": '#f6f6f6'
        },
        {
          "id": 1,
          "cameraNear": 2,
          "cameraFar": 10000,
          "cameraPosition": [0, 1.2,3],
          "cameraLookAt": [10, 10, 10],
          "gltfSceneScaleSet": [0.02, 0.02, 0.02],
          "controlsMinDistance": 3.5,
          "controlsMaxDistance": 15,
          "loaderSetPath": "/three/models/gltf/earth_poster/glTF/",
          "loaderLoad": "scene.gltf",
          "controlsTargetSset": [0, 1.2, 0],
          "color": '#f6f6f6'
        },
        {
          "id": 2,
          "cameraNear": 2,
          "cameraFar": 10000,
          "cameraPosition": [0, 0, 5],
          "cameraLookAt": [10, 10, 10],
          "gltfSceneScaleSet": [0.02, 0.02, 0.02],
          "controlsMinDistance": 3.5,
          "controlsMaxDistance": 15,
          "loaderSetPath": "/three/models/gltf/glb/",
          "loaderLoad": "moon.glb",
          "controlsTargetSset": [0, 1.2, 0],
          "color": '#f6f6f6'
        },
        {
          "cameraNear": 3,
          "cameraFar": 10000,
          "cameraPosition": [0, 2, 8],
          "cameraLookAt": [10, 10, 10],
          "gltfSceneScaleSet": [1, 1, 1],
          "controlsMinDistance": 3.5,
          "controlsMaxDistance": 15,
          "loaderSetPath": "/three/models/gltf/glb_new/",
          "loaderLoad": "panda2.glb",
          "controlsTargetSset": [0, 0, 0]
        },
      ]
    // const dataList: any = computed(() => {
    //   return store.getters[`channel/${props.data.module}`]['articleList']
    // });
    const coding: any = channels().coding;
    const checkedList: any = ref([])

    return {
      coding,
      dataList,
      checkedList,
      auth: proxy.$auth.init('partner')
    }
  }
})
</script>

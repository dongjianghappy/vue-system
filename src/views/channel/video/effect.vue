<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="特效管理">
      <template v-slot:extraright>
        <EffectDetail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList.list" :key="index">

      <div class="thumbnail p10 relative" style="background: rgb(255, 255, 255); overflow: hidden;">
        <div class="cover" style="position: absolute; top: 0px; left: 0px; bottom: 0px; width: 100%; z-index: 10; display: none;">
          <i class="iconfont icon-checkbox"><input name="checkbox" type="checkbox" value="6" style="display: none;"></i></div>
        <a class="infos trip_arrow content_trip bg-white hide" style="position: absolute; top: 15px; right: 15px;">
          <i class="iconfont icon-down"></i></a>
        <img :src="item.image[0]" style="width: 100%; height: 150px;" @click="showImg(item)" class="pointer" />

        <div class="caption relative" style="padding: 10px 0px; height: 40px;">
          <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display: block !important;">{{item.title}}{{item.parent ? `(${item.parent})` : ""}} <i class="iconfont icon-top cl-red" v-if="item.istop === '1'" /></span>
        </div>
        <div class="relative" style="border-top: 1px dotted rgb(234, 234, 234); padding: 10px 0px; height: 40px; height: 53px; line-height: 34px;">
          <v-avatar :data="item" />{{item.nickname}}
          <span class="right">
            <v-popover content="操作" arrow="tb" offset="right" :move="-30" :keys="`static_${index}`">
              <ul class="font14 p15" style="display: block">
                <li>
                  <v-button @onClick="handleClick(item)" :disabled="true">
                    编辑
                  </v-button>
                </li>
                <li>
                  <v-confirm name="删除" :data="{id: item.id, coding, operating: 'remove' }" type="text" api="removeAndRestore" :render="render" operating="delete" :auth="true"></v-confirm>
                </li>
                <li>
                  <v-confirm name="置顶" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding }" type="text" api="changeData" :render="render" operating="setTop" :auth="true"></v-confirm>
                </li>
              </ul>
            </v-popover>
          </span>
        </div>
      </div>
    </div>
  

<v-nodata :data="dataList.list || []" />
<!-- <v-loading :loading="loading" :dataList="dataList.list || []" /> -->
<v-buttongroup disabled="false" :data="{id: checkedList, coding }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" />

<v-layer v-model:isShow="showFlag" :data="currentData" :img="currentImg" v-if="showFlag" type="album" /></div>
</div>
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
import Video from '@/components/packages/play/videos.vue'
import EffectDetail from './components/effectDetail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Video,
    EffectDetail
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
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
    const coding: any = "K10006";
    const checkedList: any = ref([])
    const showFlag: any = ref(false)
    const currentData: any = ref({})
    const currentImg: any = ref()

    const dataList: any = ref({})

    function init() {
      store.dispatch('channel/musicLrcAction', {
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    function showImg(param: any) {
      currentData.value = param
      debugger
      currentImg.value = param.image[0]
      showFlag.value = !showFlag.value
    }

    function handleClick(params: any) {
      let url = `/admin/${props.data.module}/list/edit`
      if (params !== 'add') {
        url = url + `?id=${params.id}`
      }

      router.push(url)
    }

    onMounted(init)

    return {
      coding,
      checkedList,
      dataList,
      showFlag,
      currentImg,
      currentData,
      showImg,
      handleClick
    }
  }
})
</script>

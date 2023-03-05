<template>
<div style="overflow: auto;">
  <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList.list" :key="index">
    <div class="thumbnail p10 relative" style="background: rgb(255, 255, 255); overflow: hidden;">
      <v-thumbnail :data="item" :coding="data.coding.art" type="Video" :getNeighbor="getNeighbor" />

      <div class="caption relative" style="padding: 10px 0px; height: 40px;">
        <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display: block !important;">{{item.title}}</span>
      </div>
      <div class="relative" style="border-top: 1px dotted rgb(234, 234, 234); padding: 10px 0px; height: 40px; height: 53px; line-height: 34px;">
        <v-avatar :data="item" />{{item.nickname}}

      </div>
    </div>
  </div>
</div>
<v-buttongroup disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  channels
} from '@/utils'
import {
  useStore
} from 'vuex'
import Video from '@/components/packages/play/videos.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Video
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
    const coding: any = channels().coding.art;
    const checkedList: any = ref([])
    const dataList: any = computed(() => {
      return store.getters[`channel/${props.data.module}`]['articleList']
    });

function getNeighbor() {
      
      store.dispatch('common/Fetch', {
        api: "getNeighbor",
        data: {
          coding: coding,
          id: props.data.id
        }
      }).then(res => {
        debugger
        // detail.value = res.result
      })
    }

    return {
      coding,
      checkedList,
      dataList,
      getNeighbor
    }
  }
})
</script>

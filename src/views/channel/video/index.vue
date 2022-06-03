<template>
<div style="overflow: auto;">
  <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList.list" :key="index">
    <div class="thumbnail p10 relative" style="background: rgb(255, 255, 255); overflow: hidden;">
      <div class="cover" style="position: absolute; top: 0px; left: 0px; bottom: 0px; width: 100%; z-index: 10; display: none;">
        <i class="iconfont icon-checkbox"><input name="checkbox" type="checkbox" value="6" style="display: none;"></i></div>
      <a class="infos trip_arrow content_trip bg-white hide" style="position: absolute; top: 15px; right: 15px;">
        <i class="iconfont icon-down"></i></a>
      <Video title="视频" :data="item" />

      <div class="caption relative" style="padding: 10px 0px; height: 40px;">
        <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display: block !important;">{{item.title}}</span>
      </div>
      <div class="relative" style="border-top: 1px dotted rgb(234, 234, 234); padding: 10px 0px; height: 40px; height: 53px; line-height: 34px;">
        <v-avatar :data="item" />{{item.nickname}}

      </div>
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
    const dataList = computed(() => {
      return store.getters['channel/articleList']
    });

    return {
      coding,
      checkedList,
      dataList
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="视频管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
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
          <Video title="视频" :data="item" />
        
        <div class="caption relative" style="padding: 10px 0px; height: 40px;">
          <span class="inputline updata nowrap" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display: block !important;">{{item.title}}</span>
        </div>
        <div class="relative" style="border-top: 1px dotted rgb(234, 234, 234); padding: 10px 0px; height: 40px; height: 53px; line-height: 34px;">
          <v-avatar :data="item" />{{item.nickname}}
          
        </div>
      </div>
    </div>
    <table width="100%" class="table-striped table-hover col-left-2" v-if="0">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-4">歌曲</td>
        <td class="col-md-1">歌手</td>
        <td class="col-md-1">分类</td>
        <td class="col-md-1">试听</td>

        <td class="col-md-1">时长</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.singer}}
        </td>
        <td></td>
        <td><i class="iconfont icon-listen listen"></i></td>
        <td></td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList || []" />
    <!-- <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" /> -->
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
import Detail from './components/detail.vue'
import Video from '@/components/packages/play/videos.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Video
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['channel/videoList']);
    const coding: any = channels().coding.art;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('channel/videoListAction', {
        api: 'articleList',
        data: {
          coding,
          page: 1,
          pagesize: 30
        }
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

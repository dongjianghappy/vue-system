<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="音效素材">
      <template v-slot:extraright>
        <Detail :coding="coding" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-3">名称</td>
        <td class="col-md-1">分类</td>
        <td class="col-md-1">试听</td>
        <td class="col-md-1">时长</td>
        <td class="col-md-1">大小</td>
        <td class="col-md-1">格式</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.title}}
        </td>
        <td><v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding}" :isUpdate="true" type="text"></v-category></td>
        <td><Audio :data="{...item, index, number: dataList.list.length}" /></td>
        <td> {{durationTrans(item.duration)}}</td>
        <td> {{`${(item.size / 1024 / 1024).toFixed(3)}MB`}}</td>
        <td> {{item.format}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{id: item.id}" :coding="coding" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
            <Popover content="更多" arrow="tb" offset="right" :move="-650" :keys="`static_${index}`">
          <div class="p15 font14" style="width: 700px;">
            <table width="100%" class="table-striped table-hover">
              <tr>
                <td class="col-md-1">ID</td>
                <td class="col-md-1">播放</td>
                <td class="col-md-1">浏览</td>
                <td class="col-md-1">评论</td>
                <td class="col-md-1">点赞</td>
                <td class="col-md-1">收藏</td>
                <td class="col-md-1">下载</td>
                <td class="col-md-1">发布者</td>
                <td class="col-md-2">操作</td>
              </tr>
              <tr>
                <td>{{item.id}}</td>
                <td>{{item.play}}</td>
                <td>{{item.visit}}</td>
                <td>{{item.comment}}</td>
                <td>{{item.praise}}</td>
                <td>{{item.collect}}</td>
                <td>{{item.download}}</td>
                <td>{{item.nickname}}</td>
                <td>
                  
                </td>
              </tr>
            </table>
            
          </div>
        </Popover>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" />
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
  channels,
  durationTrans
} from '@/utils'
import {
  useStore
} from 'vuex'
import Popover from '@/components/packages/popover/index.vue';
import Detail from './components/detail.vue'
import Audio from '../player/audio.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Popover,
    Detail,
    Audio
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['channel/musicList']);
    const coding: any = channels().coding;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('channel/musicListAction', {
        data: {
          page: 1,
          pagesize: 10,
          kind: 'effects'
        }
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init,
      durationTrans
    }
  }
})
</script>

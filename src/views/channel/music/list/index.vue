<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="歌曲管理">
      <template v-slot:extraright>
        <Detail :coding="coding" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-2">歌曲</td>
        <td class="col-md-1">歌手</td>
        <td class="col-md-1">专辑</td>
        <td class="col-md-1">分类</td>
        <td class="col-md-1">试听</td>
        <td class="col-md-1">时长</td>
        <td class="col-md-1">大小</td>
        <td class="col-md-1">格式</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.title}}
        </td>
        <td>
          {{item.singer}}
        </td>
        <td>
          {{item.singer}}
        </td>
        <td><v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding}" type="text"></v-category></td>
        <td><Audio :data="{...item, index, number: dataList.list.length}" /></td>
        <td> {{durationTrans(item.duration)}}</td>
        <td> {{`${(item.size / 1024 / 1024).toFixed(2)}MB`}}</td>
        <td> {{item.format}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id}" :coding="coding" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.art}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding: coding.art }" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" />
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
import Detail from './components/detail.vue'
import Audio from '../player/audio.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
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
          kind: 'music'
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

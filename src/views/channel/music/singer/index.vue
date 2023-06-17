<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="歌手管理">
      <template v-slot:extraright>
        <Detail :data="{ coding: coding.singer }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-5">歌手</td>
        <td class="col-md-2">专辑</td>
        <td class="col-md-2">歌曲数量</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
        </td>
        <td>
          <AlbumList :name="item.name" :data="{singer_id: item.id, coding: coding.album }" :render="init" />({{item.album_num}})
        </td>
        <td>{{item.music_num}}</td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding: coding.singer}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.singer}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding: coding.singe }" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" />
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
import AlbumList from './components/albumList.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    AlbumList
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['channel/musicSinger']);
    const coding: any = channels().coding;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('channel/musicSingerAction', {
        data: {
          coding: coding.singer,
          page: 1,
          pagesize: 10
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

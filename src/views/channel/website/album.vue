<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="专辑管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList" :key="index">
      <div class="thumbnail p10 relative" style="box-shadow: 0 1px 3px rgba(27, 95, 160, 0.1); overflow: hidden;">
        <div class="cover hide" style="position:absolute;top:0;left:0;bottom:0;width:100%;z-index:10;">
          <i class="iconfont icon-checkbox"><input name="checkbox" type="checkbox" value="2" style="display:none;"></i></div>
          <img width="0" height="150" :src="item.image[0]">
        <div class="caption relative" style="padding: 10px 0px;"><span class="nowrap" >{{item.name}}</span>
        <span style="position: absolute; right: 0px; top: 10px;">{{item.num}}张</span></div>
      </div>
    </div>
    <v-nodata :data="dataList.list || []" />
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
export default defineComponent({
  name: 'HomeViewdd',
  components: {

  },
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = channels().coding.lrc;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'albumList',
        data: {
          coding: 'U40001',
          page: 1,
          pagesize: 10
        }
      }).then((res: any) => {
        dataList.value = res.result
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

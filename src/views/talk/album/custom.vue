<template>
<Album title="相册专辑" :render="init" type="effects" />
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="自定义">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList" :key="index">
    <v-thumbnail :data="item" />
    </div>
    <v-nodata :data="dataList || []" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  useStore
} from '@/utils'
import List from './components/list.vue'
import Album from './components/album.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const checkedList: any = ref([])
    const albumList: any = ref([])

    // 初始化
    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: 'photoList',
        data: {
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)
</script>

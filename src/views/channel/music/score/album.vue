<template>
<div style="overflow: auto;">
  <div class="col-sm-6 col-md-2 p10" v-for="(item, index) in dataList.list" :key="index">

    <div class="thumbnail p10 relative" style="overflow: hidden;">
      <v-thumbnail :data="item" :coding="data.coding" :type="type" :getNeighbor="getNeighbor" :hasInfo="false" />
      <div class="caption relative" style="padding: 10px 0px; height: 40px;">
        <span class="inputline updata" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; ">{{item.name}}</span>
        <span>
          <Detail action="edit" :data="{id: item.id, coding: data.coding}" :param="param" :render="render" />
        </span>
      </div>
    </div>
  </div>

</div>
<v-nodata :data="dataList.list || []" />
<v-loading :loading="loading" :dataList="dataList.list || []" />
<v-buttongroup disabled="false" :data="{id: checkedList, coding: data.coding }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" />
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useProps
} from '@/utils'
import Detail from './components/detail.vue'
  const props: any = defineProps({
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "image"
    },
    ...useProps
  })
    const checkedList: any = ref([])
</script>

<style lang="less" scoped>
.thumbnail {
  background: rgb(255, 255, 255);

  &:hover {
    background: #f8f8fa;
  }
}
</style>

<template>
<div class="module-wrap">
  <div class="module-content p15">
    <div class="mb15 font14">
      <span class="right">
        <v-search field="uid" placeholder="用户账号查找" :render="init" />
      </span>
    </div>
    <div>
      <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index" :index="index">
        <div class="align_center" style="background: #f9f9f9;">
          <div class="p15 relative">
            <span class="absolute" style="top: 0; right: 0"><v-status :data="{ item, field: 'checked', coding: data.coding.art }" /></span>
            <v-thumbnail :data="item" :coding="data.coding.art" type="picture" />
            <!-- <img :src="item.image" onerror="this.src='/images/slideshow.png'" /> -->
          </div>
          <div class="p15">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps
} from '@/utils'
import Detail from './detail.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  dataList: {
    type: Array,
    default: []
  }
})
</script>

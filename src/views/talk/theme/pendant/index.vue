<template>
<Album title="挂件装饰" :render="init" type="pendant" />
<div class="module-wrap">
  <div class="module-content p15">
    <div class="mb15 font14">
      <span class="right">
        <Detail action='add' :data="data" :render="init" />
      </span>
    </div>
    <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div><img @click="handleClick(item)" :src="item.image" style="width: 100%; height: 145px"></div>
        <div class="ptb15">{{item.name}}
        <Detail action="edit" :data="{id: item.id, ...data}" :param="param" :render="init" />
        </div>
      </div>
    </div>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  useStore,
  codings
} from '@/utils'
import Album from '../components/album.vue'
import Detail from './detail.vue'
    const store = useStore()
    const coding: any = codings.user.pendant
    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    const dataList: any = ref([])  

    // 初始化
    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'theme',
        data: {
          coding,
          ...param
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)
</script>

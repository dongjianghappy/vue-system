<template>
<div class="module-wrap">
  <div class="module-content p15">
    <span class="absolute" style="top: -55px; right: 10px;">
      <Detail action='add' :data="{coding}" :render="init" />
    </span>
    <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div class="relative">
          <img @click="handleChoose(item)" :src="item.cover" onerror="this.src='/images/slideshow.png'" style="width: 100%; height: 145px">
          <i class="iconfont icon-checkbox m0" :class="{'cl-red': item.status == '1'}" style="right: 0; top: 0; padding: 2px; z-index:1" />
        </div>
        <div class="ptb15">{{item.name}}
          <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
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
import Detail from './detail.vue'

    const store = useStore()
    const coding: any = codings.user.theme_background
    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    const dataList: any = ref([])

    function handleChoose(param: any) {
      const params: any = {
        coding: coding,
        id: param.id,
        status: 'status'
      }
      store.dispatch('common/Fetch', {
        api: 'updateStatus',
        data: {
          ...params

        }
      }).then(res => {
        init()
      })
    }

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

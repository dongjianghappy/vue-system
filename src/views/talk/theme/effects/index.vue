<template>
<Album title="主题特效" :render="init" type="effects" />
<div class="module-wrap">
  <div class="module-content p15">
    <div class="mb15 font14">
      <span class="right">
        <Detail action='add' :data="data" :render="init" />
      </span>
    </div>
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div class="relative">
          <img @click="handleChoose(item)" :src="item.image && item.image[0] || defaultTheme" style="width: 240px; height: 145px">
          <i class="iconfont icon-checkbox m0" :class="{'cl-red': item.system == '1'}" style="right: 0; top: 0; padding: 2px; z-index:1" />
        </div>
        <div class="ptb15">{{item.name}}
          <Detail action="edit" :data="{id: item.id, ...data}" :param="param" :render="init" />
          <span class="right" style="width: 20px; height: 20px;" :style="{background: item.background_color}"></span>
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
import Album from '../components/album.vue'
    const store = useStore()
    const coding: any = codings.user.effects
    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    const dataList: any = ref([])

    function handleChoose(param: any) {
      store.dispatch('common/Fetch', {
        api: 'updateStatus',
        data: {
          coding: coding,
          id: param.id,
          status: 'system'
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

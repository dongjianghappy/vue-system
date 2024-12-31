<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="鼠标特效">
      <template v-slot:extraright>
        <Detail action='add' :data="data" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
      <div style="border: 1px solid #f0f0f0;">
        <div class="bg-f7f8fa align_center" style="height: 80px; line-height: 80px;" @click="handleClick(item)"><img :src="item.file" v-if="item.file"></div>
        <div class="ptb10 plr5">{{item.name}}
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
import Detail from './detail.vue'

    const store = useStore()
    const coding: any = codings.user.cursor
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

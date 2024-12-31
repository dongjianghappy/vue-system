<template>
<Album title="主题背景" :render="init" type="theme" />
<div class="module-wrap">
  <div class="module-content p15">
    <div class="mb15 font14">
      <span class="right">
        <v-search field="uid" placeholder="用户账号查找" :render="init" v-if="currentCate.fid === 'custom'" />
        <Detail action='add' :data="data" :render="init" v-else />
      </span>
    </div>
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div class="relative">
          <img @click="handleChoose(item)" :src="item.image && item.image[0] || defaultTheme" style="width: 240px; height: 145px">
          <i class="iconfont icon-checkbox m0" :class="{'cl-red': item.system == '1'}" style="right: 0; top: 0; padding: 2px; z-index:1" />
        </div>
        <div class="ptb15">{{item.name}}
          <span>【{{item.image && item.image.length || 0}}张】</span>
          <Detail action="edit" :data="{id: item.id, ...data}" :param="param" :render="init" />
          <span class="right" style="width: 20px; height: 20px;" :style="{background: item.background_color}"></span>
          <span class="right mr10" @click="handleDefault(item)">
            <i class="iconfont icon-dot bold" :class="{'cl-red': item.isdefault == '1'}" />
          </span>
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
  const props: any = defineProps ({
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const coding: any = codings.user.theme
    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    const dataList: any = ref([])
    const currentCate = ref({})

    function handleChoose(param: any) {
      store.dispatch('common/Fetch', {
        api: 'updateStatus',
        data: {
          coding: coding,
          id: param.id,
          status: "system"
        }
      }).then(res => {
        init()
      })
    }

    function handleDefault(param: any) {
      store.dispatch('common/Fetch', {
        api: 'chooseStyle',
        data: {
          coding: props.data.coding,
          id: param.id,
          isdefault: param.isdefault
        }
      }).then(res => {
        init()
      })
    }

    // 初始化
    function init(param: any = {}) {
      currentCate.value = param
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

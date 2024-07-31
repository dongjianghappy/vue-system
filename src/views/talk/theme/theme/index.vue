<template>
<Album title="主题风格" :render="render" type="theme" />
<!-- <v-slider @onClick="handleclick"
                        :dataList="cateList" title="主题风格" :render="render" type="theme" /> -->
<div class="module-wrap">
  <div class="module-content p15">
    <div class="mb15 font14">
      <span class="right">
        <Detail action='add' :data="data" :render="render" />
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
          <Detail action="edit" :data="{id: item.id, ...data}" :param="param" :render="render" />
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

<script lang="ts">
import {
  defineComponent,
  useStore
} from '@/utils'
import Detail from './detail.vue'
import Album from '../components/album.vue'
export default defineComponent({
  name: 'ListView',
  components: {
    Detail,
    Album
  },
  props: {
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
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore()

    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"

    function handleChoose(param: any) {
      store.dispatch('common/Fetch', {
        api: 'updateStatus',
        data: {
          coding: props.data.coding,
          id: param.id,
          status: "system"
        }
      }).then(res => {
        props.render()
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
        props.render()
      })
    }    

    return {
      handleChoose,
      handleDefault,
      defaultTheme
    }
  }
})
</script>

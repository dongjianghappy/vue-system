<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="相关背景">
      <template v-slot:extraright>
        <Detail action='add' :data="data" :render="render" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div class="relative">
          <img @click="handleChoose(item)" :src="item.cover" style="width: 100%; height: 145px">
          <i class="iconfont icon-checkbox m0" :class="{'cl-red': item.status == '1'}" style="right: 0; top: 0; padding: 2px; z-index:1" />
        </div>
        <div class="ptb15">{{item.name}}
          <Detail action="edit" :data="{id: item.id, ...data}" :param="param" :render="render" />
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
import Album from '../components/album.vue'
import Detail from './detail.vue'
export default defineComponent({
  name: 'ListView',
  components: {
    Album,
    Detail
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
    type: {
      type: String,
      default: 0
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
    const param = {
      name: "",
      url: "",
      apply_checked: 1
    }

    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"

    function handleChoose(param: any) {
      const params: any = {
        coding: props.data.coding,
        id: param.id,
        status: 'status'
      }
      store.dispatch('common/Fetch', {
        api: 'updateStatus',
        data: {
          ...params

        }
      }).then(res => {
        props.render()
      })
    }
    return {
      param,
      handleChoose,
      defaultTheme

    }
  }
})
</script>

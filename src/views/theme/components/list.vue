<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar :title="type !== '1' ? '主题风格' : '背景特效'">
      <template v-slot:extraright>
        <span class="mr10" @click="handleCreateJson">生成JSON</span>
        <Detail action='add' :data="data" :render="init" v-if="type !== '1'" />
        <Detail1 action='add' :data="data" :render="init" v-else />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div class="relative">
          <img @click="handleChoose(item)" :src="item.image && item.image[0] || defaultTheme" style="width: 240px; height: 145px">
          <i class="iconfont icon-checkbox m0" :class="{'cl-red': item.status == '1'}" style="right: 0; top: 0; padding: 2px; z-index:1" />
        </div>
        <div class="ptb15">{{item.name}}
          <Detail action="edit" :data="{id: item.id, ...data}" :param="param" :render="init" v-if="type !== '1'" />
          <Detail1 action="edit" :data="{id: item.id, ...data}" :param="param" :render="init" v-else />
          <span class="right" style="width: 20px; height: 20px;" :style="{background: item.color}"></span>
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
import Detail1 from './detail1.vue'
export default defineComponent({
  name: 'ListView',
  components: {
    Detail,
    Detail1
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
    const param = {
      name: "",
      url: "",
      apply_checked: 1
    }

    const store = useStore()

    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"

    function handleChoose(param: any){
      store.dispatch('common/Fetch', {
        api: 'chooseStyle',
        data: {
          id: param.id,
          status: param.status,
          type: props.type

        }
      }).then(res => {
        props.dataList.map((item: any) => {
          item.status = 0
        })
        param.status = res.result.status
        
      })
      
    }

    function handleCreateJson(){
      store.dispatch('common/Fetch', {
        api: "createAdJson",
        data: {
          type: 'theme'
        }
      }).then((res: any) => {
        
      })
      
    }

    return {
      param,
      defaultTheme,
      handleChoose,
      handleCreateJson
    }
  }
})
</script>

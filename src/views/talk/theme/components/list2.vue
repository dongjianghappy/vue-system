<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="挂件装饰">
      <template v-slot:extraright>
        <Detail action='add' :data="data" :render="render" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div><img @click="handleClick(item)" :src="item.image" style="width: 100%; height: 145px"></div>
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
} from '@/utils'
import Detail from './detail2.vue'
export default defineComponent({
  name: 'ListView',
  components: {
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
    const param = {
      name: "",
      url: "",
      apply_checked: 1
    }

    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"

    return {
      param,
      defaultTheme
    }
  }
})
</script>

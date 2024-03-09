<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="签到内容">
      <template v-slot:extraright>
        <Detail action='add' :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <div class="col-md-2 p10" v-for="(item, index) in dataList" :key="index">
      <div style="border: 1px solid #f0f0f0;">
        <div class="bg-f7f8fa align_center" style="height: 120px; line-height: 120px;" @click="handleClick(item)"><img :src="item.image[0]" style="width: 100%; height: 120px" /></div>
        <div class="ptb10 plr5">{{item.name}}
          <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
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
  onMounted,
  useStore,
  ref,
  codings
} from '@/utils'
import Detail from './detail3.vue'
export default defineComponent({
  name: 'ListView',
  components: {
    Detail
  },
  props: {
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
  },
  setup(props, context) {
    const param = {
      name: "",
      url: "",
      apply_checked: 1
    }

    const store = useStore();
    const coding = codings.sign
    const dataList: any = ref([])

    const defaultTheme = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      dataList,
      coding,
      init,
      param,
      defaultTheme
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="用户签到">

    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-8">用户</td>
        <td class="col-md-2">签到时间</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-space>
           
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@/utils'
export default defineComponent({
  name: 'ListView',
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

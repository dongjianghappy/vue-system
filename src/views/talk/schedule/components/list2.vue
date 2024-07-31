<template>
<div>
  <table class="table-striped table-hover col-left-2">
    <tr class="th">
      <td class="col-md-1">名称</td>
      <td class="col-md-8">描述</td>
      <td class="col-md-1">状态</td>
      <td class="col-md-2">完成状况</td>
    </tr>
    <tr v-for="(item, index) in dataList" :key="index" :index="index">
      <td>
        {{item.name}}
      </td>
      <td>
        {{item.description}}
      </td>
      <td>
        <v-switch :data="{ item, field: 'status', coding: data.coding }" :auth="true" />
      </td>
      <td>
        {{item.complete === '0' ? '已完成' : '进行中' }}        
      </td>
    </tr>
  </table>
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

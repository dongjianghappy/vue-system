<template>
<div>
  <table class="table-striped table-hover col-left-23">
    <tr class="th">
      <td class="col-md-1">名称</td>
      <td class="col-md-4">描述</td>
      <td class="col-md-2">能量</td>
      <td class="col-md-2">同步到动态</td>
      <td class="col-md-1">状态</td>
      <td class="col-md-2">操作</td>
    </tr>
    <tr v-for="(item, index) in dataList" :key="index" :index="index">
      <td>
        {{item.name}}
      </td>
      <td>
        {{item.description}}
      </td>
      <td>
        {{item.energy_name || '-'}}
      </td>
      <td>
        {{item.sync === '1' ? '是' : '否'}}
      </td>
      <td>
        <v-switch :data="{ item, field: 'status', coding: data.coding }" :auth="true" />
      </td>
      <td>
        <Detail action="edit" :data="{ id: item.id, coding: data.coding }" :render="init" />
      </td>

    </tr>
  </table>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@/utils'
import Detail from './detail.vue'
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

<template>
<table class="table-striped table-hover col-left-3">
  <tr class="th">
    <td class="col-md-1">顺序</td>
    <td class="col-md-4">标签名称</td>
    <td class="col-md-2">标签值</td>
    <td class="col-md-1">tag</td>
    <td class="col-md-3">icon标签</td>
    <td class="col-md-1">状态</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>
      <v-quick :value="item.sort" :data="{ id: item.id, field: 'sort', ...data }" :auth="true" />
    </td>
    <td>{{item.name}}</td>
    <td>
      <v-quick :value="item.value" :data="{ id: item.id, field: 'value', ...data }" :auth="true" />
    </td>
    <td>
      <v-quick :value="item.tag" :data="{ id: item.id, field: 'tag', ...data }" :auth="true" />
    </td>
    <td>
      <v-quick :value="item.icon" :data="{ id: item.id, field: 'icon', ...data }" :style="{width: '60px'}" :auth="true" />
      <v-quick :value="item.color" :data="{ id: item.id, field: 'color', ...data }" :style="{width: '80px'}" :auth="true" />
      <i :class="`iconfont icon-${item.icon}`"></i>
    </td>
    <td>
      <v-switch :data="{ item, field: 'status', ...data }" :auth="true" />
    </td>
  </tr>
</table>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
})
</script>

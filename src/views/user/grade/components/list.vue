<template>
<table class="table-striped table-hover col-left-12">
  <tr class="th">
    <td class="col-md-1">{{name}}</td>
    <td class="col-md-4">描述</td>
    <td class="col-md-1">普通用户</td>
    <td class="col-md-1">普通会员</td>
    <td class="col-md-1">高级会员</td>
    <td class="col-md-1">VIP会员</td>
    <td class="col-md-1">超级VIP</td>
    <td class="col-md-1">绑定状态</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.name}}</td>
    <td>{{item.description}}</td>
    <td>
      <v-switch :data="{ item, field: 'visitors', coding: data.coding }" :auth="true" />
    </td>
    <td>
      <v-switch :data="{ item, field: 'ordinary_member', coding: data.coding }" :auth="true" />
    </td>
    <td>
      <v-switch :data="{ item, field: 'senior_member', coding: data.coding }" :auth="true" />
    </td>
    <td>
      <v-switch :data="{ item, field: 'vip_member', coding: data.coding }" :auth="true" />
    </td>
    <td>
      <v-switch :data="{ item, field: 'super_vip_member', coding: data.coding }" :auth="true" />
    </td>
    <td><i class="iconfont icon-right cl-green font18"></i></td>
    <td>
      <Detail action="edit" :data="{id: item.id, ...data}" :render="render" />
    </td>
  </tr>
</table>
<v-nodata :data="dataList" />
</template>

<script lang="ts">
import {
  defineComponent,
} from '@/utils'
import Detail from './detail.vue'
export default defineComponent({
  name: 'v-List',
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
    name: {
      type: String,
      default: ""
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  }
})
</script>

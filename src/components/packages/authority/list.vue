<template>
<v-tabs :tabs='[{
        name: "页面模块"
      },
      {
        name: "页面链接"
      },
      {
        name: "功能设置"
      }
    ]' method="click" :extra="false">
  <template v-slot:content1>
    <List2 :dataList="dataList" :data="data" :type="type" :channel_id="channel_id" index="0" :render="render" />
  </template>
  <template v-slot:content2>
    <List2 :dataList="dataList" :data="data" :type="type" :channel_id="channel_id" index="1" :render="render" />
  </template>
  <template v-slot:content3>
    <List2 :dataList="dataList" :data="data" :type="type" :channel_id="channel_id" index="2" :render="render" />
  </template>
</v-tabs>
</template>

<script lang="ts">
import {
  defineComponent
} from '@/utils'
import List2 from './list2.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    List2
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    channel_id: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    dataList: {
      type: Object,
      default: () => {
        return []
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

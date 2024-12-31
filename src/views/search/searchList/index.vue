<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :render="init" :coding="coding" :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :coding="coding" :dataList="dataList" />
    </template>
    <template v-slot:content3>
      <Calendar />
    </template>
  </v-tabs>
</div>
</template>

<script setup lang="ts">
import {
  ref,
  codings
} from '@/utils'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import Calendar from "./components/calendar.vue"

    const coding: any = codings
    
    let menu: any = ref([{
        name: "搜索明细",
        value: "advertisement2"
      },
      {
        name: "每日概况",
        value: "advertisement3"
      },
      {
        name: "日期查看",
        value: "advertisement3"
      }
    ])
</script>

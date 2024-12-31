<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra v-if="isWebsite">
      <v-space>
        <v-condition v-model:value="search" name="排序" icon="sort-desc" field="source_url" :enums="[{value: 'google', name: '谷歌'}, {value: 'baidu.com', name: '百度'}, {value: 'sogou.com', name: '搜狗'}, {value: 'so.com', name: '360'}, {value: 'bing', name: '必应'}, {value: 'toutiao.com', name: '头条'}, {value: 'sm.cn', name: '神马'}]" :render="getData" />
      </v-space>
    </template>
    <template v-slot:content1>
      <List ref="refList" :coding="coding" />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :coding="coding" />
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
  useRoute,
} from '@/utils'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import Calendar from "./components/calendar.vue"
    const route = useRoute();
    let isWebsite: any = ref(route.path.indexOf("talk") === -1 ? true : false)
    let menu: any = ref(visitPage)
    const search: any = ref("")
    const refList: any = ref(null)

    function getData(parm: any){
      refList.value.init(parm)
    }
</script>

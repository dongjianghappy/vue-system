<template>
  <div class="search">
    <div class="searchinput">
      <input type="text"
             placeholder="站内搜索"
             v-model="content"
             @keypress.enter="search">
    </div>
    <div class="searchbtn"
         style="padding: 7px;">
      <a style="padding:0px"
         @click="search"><i class="iconfont icon-search"></i></a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import {useStore} from 'vuex'
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const content: any = ref("")

    content.value = route.query.q
    function search(){
      router.push(`/admin/search?q=${content.value}`)
    }
</script>

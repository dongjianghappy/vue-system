<template>
<div class="p25">
  <v-basicinfo v-model:data="dataList" :edit="edit" />
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  computed,
  useStore
} from '@/utils'

    const store = useStore();
    const dataList = computed(() => store.getters['website/webinfo']);

    function init() {
      store.dispatch('website/BasicInfo', {
        coding: "P0000"
      })
    }

    function edit(param: any){
      
      store.dispatch('common/Fetch', {
          api: "updateInfo",
          coding: "P0000",
          data: {
            id: 123
          }
      }).then(res => {
        
      })       
    }

    onMounted(init)
</script>


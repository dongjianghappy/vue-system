<template>
  <div class="module-wrap">
    <div class="module-head">
      <v-optionsbar title="友情链接">
        <template v-slot:extraright>
          扩展值
        </template>
      </v-optionsbar>
    </div>
    <div class="module-content plr15">
      <List :dataList="dataList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'

import List from './components/list.vue'

    const store = useStore();
    const coding = codings.order
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    function edit(param: any) {

    }

    onMounted(init)
</script>

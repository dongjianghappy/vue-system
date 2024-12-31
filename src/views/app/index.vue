<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="来源地址">
      <template v-slot:extraright>
        <span @click="handleClick">添加地址</span>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="flex p10" v-for="(item, index) in dataList" :key="index" :index="index">
      <div style="flex: 1">{{item.source_url}}</div>
      <div class="w80">123</div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings,
  useRouter
} from '@/utils'
import Detail from './components/detail.vue'
    const store = useStore();
    const router = useRouter()
    const dataList = ref([]);
    const coding: any = codings.content_source;
    function init() {
      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      }).then((res: any) => {
        dataList.value = res.result.list
      })
    }

    function handleClick(){
      router.push('/app/detail')
    }

    onMounted(() => {
      init()
    })
</script>

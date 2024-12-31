<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="机器人管理">
      <template v-slot:extraright>
        <Detail :data="{ coding: 'Q0014' }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <Robot name="用户总量" :data="item" path="version" />
    </div>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore,
  useRouter
} from '@/utils'
import Detail from './components/detail.vue'
import Robot from './components/robot.vue'

    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "robot",
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/robot/${param}`)
    }

    onMounted(init)
</script>

<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">序号</td>
    <td class="col-md-9">来路域名</td>
    <td class="col-md-1">访问次数</td>
    <td class="col-md-1">占比</td>
  </tr>
   <tr v-for="(item, index) in dataList" :key="index">
    <td>{{item.id}}</td>
    <td>{{item.domain}}</td>
    <td>{{item.nums}}</td>
    <td>{{item.ip}}</td>
  </tr>
</table>
<v-nodata :data="dataList || []" />
</template>

<script setup lang="ts">
import {
  defineEmits,
  computed,
  useStore,
  useRoute
} from '@/utils'

  const emit: any = defineEmits(['onClick'])
  
    const store = useStore();
    const route = useRoute();
    const dataList = computed(() => {
      return store.getters['setting/domain1'] || []
    });
    function handleclick() {
      emit('onClick')
    }
</script>

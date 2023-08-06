<template>
<div class="col-md-3" style="padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="累计览量" :value="data.total_visit || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日览量" :value="data.yesterday && data.yesterday.pv || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日览量" :value="data.today && data.today.pv || 0" />
    </div>
  </div>
  <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-4">
      <v-statisticcard name="累计IP" :value="data.total_ip || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="昨日IP" :value="data.yesterday && data.yesterday.ip || 0" />
    </div>
    <div class="col-md-4">
      <v-statisticcard name="今日IP" :value="data.today && data.today.ip || 0" />
    </div>
  </div>
  <div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
    <div class="col-md-6">
      <v-statisticcard name="累计搜索" value="2,836" />
    </div>
    <div class="col-md-6">
      <v-statisticcard name="今日搜索" value="2,836" />
    </div>
  </div>
  <div class="col-md-3" style="padding-left: 8px;">
    <div class="col-md-6">
      <v-statisticcard name="最高浏览" value="2,836" />
    </div>
    <div class="col-md-6">
      <v-statisticcard name="最高IP" value="2,836" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
})
</script>

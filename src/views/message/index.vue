<template>
<div class="col-md-9">
  <div class="mb10" style="overflow: auto;">
    <Card :data="visit" />
  </div>
  <div class="mb10" style="overflow: auto;">
    <div class="module-wrap">
      <div class="module-head">
        今日与昨日访问量
      </div>
      <div class="module-content plr15" style="height: 545px;">

      </div>
    </div>
  </div>
</div>
<div class="col-md-3">
  <Setting :data="coding" />
</div>
</template>

<script setup lang="ts">
import {
  codings
} from '@/utils'
import {
  ChartLine,
  ChartPie
} from '@/components/packages/chart/index'
import Card from "./components/card.vue"
import Setting from "./setting.vue"
    const coding: any = codings.message
</script>

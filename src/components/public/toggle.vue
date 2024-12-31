<template>
  <i class="iconfont icon-arrow deg180" style="margin: 8px !important" @click="handleToggle(-1)"></i>
  <i class="iconfont icon-arrow" style="margin: 8px !important" @click="handleToggle(1)"></i>
</template>

<script setup lang="ts">
import {
  ref
} from 'vue'

let current: any = ref(0)

function handleToggle(param: any) {
  if ((param === -1 && current.value === 0) || (param === 1 && current.value === 4)) {
    return
  }
  current.value += param
}
</script>

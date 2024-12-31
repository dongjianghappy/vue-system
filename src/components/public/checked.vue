<template>
  <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
    <input type="checkbox" v-model="data[attr]" :checked="data[attr]" class="mr5" style="float: left;"><span>显示</span>
  </label>
</template>

<script setup lang="ts">
import {
  defineProps
} from 'vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  attr: {
    type: String,
    default: 'checked'
  }
})
</script>

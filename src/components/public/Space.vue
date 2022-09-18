<template>
<div class="space">
  <slot></slot>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Space'
})
</script>

<template>
<img :src="data.photos" class="mr10" style="width: 32px;
    height: 32px;
    border-radius: 50%;
    float: left">
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      default: () => {
        return
      }
    }
  }
})
</script>

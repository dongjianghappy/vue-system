<template>
<div class="mask" @click="handleclick"></div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-Mask',
  props: {
    isShow: {
      type: String,
      default: false
    }
  },
  emits: ['update:isShow'],
  setup(props, context) {
    function handleclick() {
      context.emit('update:isShow', !props.isShow)
    }
    return {
      handleclick
    }
  }
})
</script>

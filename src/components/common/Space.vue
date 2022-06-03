<template>
  <div class="space">
    <slot></slot>  
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();

    function handleclick(){
      context.emit('onClick')
    }
    return {
      handleclick
    }
  }
})
</script>

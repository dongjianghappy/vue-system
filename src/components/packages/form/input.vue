<template>
  <button @click="handleclick"
          class="btn btn-default" :style="style">
    <slot>按钮</slot>
  </button>
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

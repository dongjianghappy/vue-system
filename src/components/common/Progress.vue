<template>
<div class="progress progress-line">
  <div class="progress-outer">
    <div class="progress-inner">
      <div class="progress-bg" style="height: 6px;" :style="`width: ${data.vote || data.bar || 0}%`"></div>
    </div>
  </div><span class="progress-text" title="0%">{{data.vote || data.bar || 0}}%</span>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

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
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    function handleclick() {
      context.emit('onClick')
    }
    return {
      handleclick
    }
  }
})
</script>

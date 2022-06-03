<template>
<div><slot>dfdf</slot></div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  emits: ['label'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    function init(){
      
      context.emit('label', {label: props.label, name: props.name})
    }

    function handleclick() {
      
    }

    onMounted(()=>
      init()
    )
    return {
      handleclick
    }
  }
})
</script>

<template>
  <div>
    {{value}}
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    label: {
      type: String,
      default: "",
    },
        name: {
      type: String,
      default: "",
    },
        value: {
      type: String,
      default: "",
    },
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['update:checked'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const checked: any = ref("")

    function handleclick(param: any) {
      alert(param)
      context.emit('update:checked', param)
    }
    return {
      handleclick,
      checked
    }
  }
})
</script>

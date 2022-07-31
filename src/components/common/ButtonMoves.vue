<template>
<span @click="handleclick" class="pointer" :class="{'set-gray': !auth}"><i class="iconfont icon-move"></i>移动</span>
</template>

<script lang="ts">
import {
  defineComponent
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    move: {
      type: Boolean,
      default: false
    },
    auth: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:move'],
  setup(props, context) {
    function handleclick() {
      context.emit('update:move', !props.move)
    }
    return {
      handleclick
    }
  }
})
</script>

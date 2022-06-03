<template>
<span @click="handleclick" class="pointer" :class="{'set-gray': !auth}" ><i class="iconfont icon-move"></i>移动</span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
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
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();

    function handleclick() {
      // if(!props.auth){
      //   return
      // }
      context.emit('update:move', !props.move)
    }
    return {
      handleclick
    }
  }
})
</script>

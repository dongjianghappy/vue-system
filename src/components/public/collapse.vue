<template>
<div class="collapse">
  <div class="collapse-head ptb10" @click="handleShow">
    <i v-if="!collapse" class="iconfont icon-arrow arrow " :class="collapse ? 'deg90' : ''"></i>
    <span>{{title}}</span>
    <span class="right align_right" >
      <slot name="extra"></slot>
    </span>
  </div>
  <div class="collapse-list p15" v-show="collapse">
    <slot></slot>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'

export default defineComponent({
  name: 'v-Collapse',
  props: {
    title: {
      type: String,
      default: ""
    },
    disableClick: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:index'],
  setup(props, context) {
    let collapse: any = ref(true)

    function handleShow(params: any) {
      if(props.disableClick) return
      collapse.value = !collapse.value
    }
    return {
      handleShow,
      collapse
    }
  }
})
</script>

<style scoped>
.current {
  color: #40a9ff !important;
}
</style>


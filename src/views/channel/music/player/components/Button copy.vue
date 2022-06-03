<template>
  <span class="pointer" @click="handleclick" v-if="buttonType === 'text'" ><slot>按钮</slot></span>
  <button @click="handleclick"
          class="btn btn-default" :style="style" v-else >
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
    // 名称
    name: {
      type: String,
      default: "按钮"
    },
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 按钮类型
    buttonType: {
      type: String,
      default: "text"
    }    
  },
  emits: ['update:show', 'onClick'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();

    function handleclick(){
      context.emit('onClick')
      context.emit('update:show', !props.show)
    }
    return {
      handleclick
    }
  }
})
</script>

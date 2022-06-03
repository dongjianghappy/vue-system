<template>
  <span class="pointer" @click="handleclick" v-if="buttonType === 'text'" :class="{'set-gray': !disabled}" ><slot>按钮</slot></span>
  <button :class="{'set-gray': !disabled}" :disabled="!disabled" @click="handleclick"
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
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 是否展示
    disabled: {
      type: Boolean,
      default: true
    },    
    // 按钮类型
    buttonType: {
      type: String,
      default: "text"
    }    
  },
  emits: ['update:show', 'onClick'],
  setup(props,context) {
    const {
      proxy
    }: any = getCurrentInstance();

    function handleclick(){
      if(!props.disabled) {
          proxy.$hlj.message({
            msg: "亲，你无权限操作！"
          })
        return
      }

      context.emit('onClick')
      context.emit('update:show', !props.show)
    }
    return {
      handleclick
    }
  }
})
</script>

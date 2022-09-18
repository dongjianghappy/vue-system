<template>
<span style="color: #eee">
  <i class="iconfont icon-list pointer" @click="handelClick('list')"></i>|
  <i class="iconfont icon-app pointer" @click="handelClick('album')"></i>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'v-ToggleDisplay',
  emits: ['update:toggle'],
  setup(props, context) {

    function handelClick(param: any) {
      context.emit('update:toggle', param)
    }
    return {
      handelClick
    }
  }
})
</script>

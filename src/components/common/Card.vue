<template>
<div class="bg-white mb15">
  <div class="p15" style="display: flex; justify-content: space-between; border-bottom: 1px solid #f0f0f0;">
    <div style="display: flex; height: 32px; line-height: 32px;">
      <div class="mr15 " style="display: flex; padding-top: 7px;">
        <span class="pl10" style="border-left: 3px solid rgb(24, 144, 255); height: 20px; line-height: 20px;">{{title}}</span>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <slot name="extra"></slot>
    </div>
  </div>
  <div class="p15">
    <slot></slot>
  </div>
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
    title: {
      type: String,
      default: "标题"
    }
  }
})
</script>

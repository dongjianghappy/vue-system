<template>
  <div>
    <div class="ant-message-notice ant-move-up-leave ant-move-up-leave-active ant-move-up">
      <div class="ant-message-notice-content">
        <div class="ant-message-custom-content ant-message-info"><span role="img" aria-label="info-circle" class="anticon anticon-info-circle"><svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
            </svg></span><span>{{msg}}</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from 'vue'
export default defineComponent({
  name: "MymodalD",
  setup(props, context) {
    function message() {
      setTimeout(()=>{
        document.querySelectorAll("#ant-message")[0].remove()
      },2000)
    }
    return {
      message
    }
  }
})
</script>

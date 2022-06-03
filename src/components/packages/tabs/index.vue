<template>
<div class="aside-wrap">
 <slot>111111111</slot>
{{navaList}}
  <!-- <div class="aside-nav">
    <div class="aside-list false">普通用户</div>
    <div class="aside-list false">高级用户</div>
    <div class="aside-list false">管理员</div>
  </div>
  <div class="aside-content">
    sdsvvv
  </div> -->
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from 'vue'
import TabPane from './list.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
TabPane
  },
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    
    const navaList: any = ref([])

    function handleclick() {
      context.emit('onClick')
    }

    function qqq(param: any){
      navaList.value.push(param)
    }

    return {
      navaList,
      handleclick,
      qqq
    }
  }
})
</script>

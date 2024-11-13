<template>
<div style="display: flex; justify-content: space-between; height: 32px; line-height: 32px;">
  <div style="display: flex; height: 32px; line-height: 32px;">
    <div class="mr15 " style="display: flex; padding-top: 7px;"><span @click="handleClick" class="pl10" style="border-left: 3px solid rgb(24, 144, 255); height: 20px; line-height: 20px;">{{title}}</span></div>
 <slot name="extraleft"></slot>
  </div>
  <div style="display: flex; justify-content: space-between;">
    <slot name="extraright"></slot>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  computed
} from 'vue'

export default defineComponent({
  name: 'AsideView111',
  props: {
    title: {
      type: String,
      default: "标题"
    },
    data: {
      type: Array,
      default: () => {
        return
      }
    },
    edit: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    let isEdit: any = ref(true)
    const dataList: any = ref(props.data)

    function Edit() {
      isEdit.value = !isEdit.value
      if (isEdit.value) {
        props.edit(props.data)
      }

    }

    function handleClick(){
      context.emit('onClick', 0)
    }

    return {
      isEdit,
      dataList,
      Edit,
      handleClick
    }
  }

})
</script>

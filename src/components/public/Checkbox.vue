<template>
<input type="checkbox" :class="className" :checked="checkedList.indexOf(data.id) > -1 ? true : false" @click="handleclick(data.id)" :disabled="auth" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Checkbox',
  props: {
    className: {
      type: String,
      default: ""
    },
    checkedList: {
      type: Array,
      default: []
    },
    data: {
      type: String,
      default: ""
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    function handleclick(id: any) {
      if (props.checkedList.indexOf(id) > -1) {
        let index = props.checkedList.indexOf(id)
        props.checkedList.splice(index, 1)
      } else {
        props.checkedList.push(id)
      }
    }
    return {
      handleclick
    }
  }
})
</script>

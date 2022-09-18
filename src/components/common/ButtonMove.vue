<template>
<button @click="handleclick({
                            ...data,
                            direction: 'down',
                          })" class="ant-btn deg180 move-button">
  <i class="iconfont icon-arrow1 moving font14"></i>
</button>
<button @click="handleclick({
                            ...data,
                            direction: 'down',
                          })" class="ant-btn move-button">
  <i class="iconfont icon-arrow1 font12 pointer"></i>
</button>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'v-ButtonMove',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    function handleclick(params: any) {
      debugger
      const {
        direction,
        index,
        moveItem,
        dataList
      } = params
      const newData = dataList
      const item = newData.splice(
        index +
        (direction === 'up' ? -1 : index === dataList.length - 1 ? -index : 1),
        1,
        moveItem
      )[0]
      newData[index] = item
      debugger
    }
    return {
      handleclick
    }
  }
})
</script>

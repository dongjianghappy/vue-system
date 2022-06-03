<template>
<button type="button" @click="handleclick({
                            ...data,
                            direction: 'down',
                          })" class="ant-btn deg180 move-button"><i class="iconfont icon-arrow1 moving"></i></button>
<button type="button" @click="handleclick({
                            ...data,
                            direction: 'down',
                          })" class="ant-btn move-button"><i class="iconfont icon-arrow1"></i></button>
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
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    function handleclick(params: any) {

      const {
        direction,
        index,
        moveItem,
        parantId,
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
    }
    return {
      handleclick
    }
  }
})
</script>

<template>
<div class="absolute bg-red align_center p10" style="  display: flex; bottom: 0; left: 0; right: 0; height: 80px;">
  <div class="btn btn-default m5" :class="{'set-gray': index === 0}" style="flex: 1; line-height: 40px;" @click="handletoggle('prev')">上一条</div>
  <div class="btn btn-default m5" :class="{'set-gray': dataList.length -1 === index}" style="flex: 1; line-height: 40px;" @click="handletoggle('next')">下一条</div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
} from 'vue'

export default defineComponent({
  name: 'HomeViewe',
  props: {
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return
      }
    },
    index: {
      type: String,
      default: "0",
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      summary: "",
    }
  },
  emits: ['prevOrNext'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    // 切换按钮
    function handletoggle(param: any) {
      let length: any = props.dataList.length - 1

      debugger
      if ((props.index == "0" && param === 'prev') || (props.index == length && param === 'next')) {
        return
      }
      context.emit('prevOrNext', param)
    }

    return {
      handletoggle
    }
  }
})
</script>

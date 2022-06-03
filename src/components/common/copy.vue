<template>
<Dialog v-model:show="visible" ref="form" title="自定义字段" width="520px" height="450px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    {{img}}
  </template>
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'
import {
  Dialog
} from '@/components/packages/index'
export default defineComponent({
  name: 'HomeViewh',
  components: {
    Dialog
  },
  props: {
    img: {
      type: String,
      defualt: ""
    },
    showFlag: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:showFlag'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const visible = ref(props.showFlag)

    // 监听弹窗变量
    watch([visible], (next, prev) => {
      context.emit('update:showFlag', false)
    })

    // 初始化数据
    function init() {
      console.log("sdsd");

    }

    onMounted(init)
    return {
      visible
    }
  }
})
</script>

<style scoped>
.current {
  background: #1890ff;
  border-radius: 2px;
  color: #fff;

}
</style>

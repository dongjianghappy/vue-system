<template>
<Popover :content="`排序:${sort[currentSort]}`" arrow="tb" offset="right" :move="-10" :keys="`static_${index}`">
  <ul class="font14" style="display: block">
    <li v-for="(item, index) in sort" :key="index" style="height: 32px" @click="handleclick(index)">{{item}}</li>
  </ul>
</Popover>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Search',
  components: {
    Popover
  },
  props: {
    // 名称
    name: {
      type: String,
      default: "按钮"
    },
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
    },
    // 按钮类型
    buttonType: {
      type: String,
      default: "text"
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const currentSort: any = ref("")
    const sort: any = {
      '': '默认',
      'id desc': '递减',
      'id asc': '递增'
    }

    function handleclick(index: any) {
      currentSort.value = index
      props.render({
        sorter: index
      })
    }
    return {
      handleclick,
      sort,
      currentSort
    }
  }
})
</script>

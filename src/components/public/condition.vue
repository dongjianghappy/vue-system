<template>
<Popover :content="`<i class='iconfont icon-${icon}' />`" arrow="tb" offset="right" :move="-30" :keys="`static_${index}`">
  <ul class="font14 p15" style="display: block">
    <li v-for="(item, index) in [{name: '默认', value: ''}, ...enums ]" :key="index" style="height: 32px" @click="handleclick(item)">{{item.name}}
      <i class="iconfont icon-right1" v-if="item.value === currentSort.value" />
    </li>
  </ul>
</Popover>
</template>

<script lang="ts">
import {
  defineComponent,
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
      default: ""
    },
    // 图标
    icon: {
      type: String,
      default: ""
    },
    // 字段
    field: {
      type: String,
      default: ""
    },
    // 枚举值
    enums: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  setup(props, context) {
    const currentSort: any = ref({
      value: '',
      name: '默认'
    })

    function handleclick(index: any) {
      currentSort.value = index
      const params: any = {}
      params[props.field] = currentSort.value.value
      props.render(params)
    }
    return {
      handleclick,
      currentSort
    }
  }
})
</script>

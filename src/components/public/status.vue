<template>
<i class="iconfont m0" :class="`icon-${icon[0]}`" :style="`color: ${color[0]}`" v-if="data.item[data.field] === '1'" @click.stop="handleclick(data.item)" />
<i class="iconfont m0" :class="`icon-${icon[1]}`" :style="`color: ${color[1]}`" v-else @click.stop="handleclick(data.item)" />
</template>

<script lang="ts">
import {
  defineComponent,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Switch',
  props: {
    icon: {
      type: Array,
      default: ['right', 'error']
    },
    color: {
      type: Array,
      default: ['#8cd52e', '#f00']
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: String,
      default: ""
    },
    param: {
      default: () => {
        return {}
      }
    },
    msg: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['toggle'],
  setup(props, context) {
    const store = useStore();
    const {
      data: {
        field,
        coding
      }
    }: any = props

    function handleclick(item: any) {
      store.dispatch('common/Fetch', {
        api: props.api || "updateStatus",
        data: {
          coding,
          id: item.id,
          status: field,
          ...props.param
        }
      }).then(res => {
        if (res.result.type) {
          item[res.result.type] = res.result.value
          context.emit('toggle', {field: props.data.item.name, value: res.result.value})
        } else {
          props.msg(res.returnMessage)
        }
      })
    }
    return {
      handleclick
    }
  }
})
</script>

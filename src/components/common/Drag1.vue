<template  draggable="true" @click="handleRouter(item.module, item.module)" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
    <slot></slot>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
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
    const store = useStore();
    const channel: any = computed(() => store.getters['user/channel']);

    const dragging: any = ref(null)
    const box: any = ref(0)
    const moveIndex: any = ref("")
    const enterIndex: any = ref("")

    function handleDragStart(e: any, item: any) {
      dragging.value = item
    }

    function handleDragEnd(e: any, item: any) {

      item = channel.value.splice(enterIndex.value, 1, dragging.value)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
      channel.value[moveIndex.value] = item;

      document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
      debugger
      let form: any = []
      channel.value.map((item: any, index: any) => {
        form.push({
          id: item.id,
          sort: index
        })
      })

      store.dispatch('common/Save', {
        data: {
          coding: "O0000",
          data: JSON.stringify(form),
        }
      })
      dragging.value = null
    }

    function handleDragOver(e: any) {
      e.dataTransfer.dropEffect = 'move'

    }

    function handleDragEnter(e: any, item: any) {
      e.dataTransfer.effectAllowed = 'move'

      if (item.name === dragging.value.name) {

        return
      }
      console.log(dragging.value);

      const newItems = channel.value

      moveIndex.value = newItems.findIndex((i: any) => {
        return i.name === dragging.value.name
      })

      enterIndex.value = newItems.findIndex((i: any) => {
        return i.name === item.name
      })

      if (box.value !== enterIndex.value) {
        document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
      }

      document.querySelectorAll('ul>li')[enterIndex.value].setAttribute("class", "current")
      box.value = enterIndex.value
      // newItems.splice(dst, 0, ...newItems.splice(src, 1))
    }

    function handleRouter(param: any, module: any) {
      debugger
      context.emit('onClick', {
        param,
        module
      })
    }

    return {
      channel,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      handleRouter
    }
  }
})
</script>

<style scoped>
.current {
  padding: 2px;
  border: 2px dashed #fff;
}

.channel-bg {
  background: #eee;
}

</style>

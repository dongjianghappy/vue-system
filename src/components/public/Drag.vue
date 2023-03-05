<template>
  <span draggable="true"  @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
    <slot></slot>
  </span>
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
    item: {
      type: String,
      default: ""
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();

    const dragging: any = ref(null)
    const box: any = ref(0)
    const moveIndex: any = ref("")
    const enterIndex: any = ref("")

    function handleDragStart(e: any, item: any) {
      dragging.value = item
      console.log("========="+ dragging.value );
      
    }

    function handleDragEnd(e: any, item: any) {

      item = props.dataList.splice(enterIndex.value, 1, dragging.value)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
      props.dataList[moveIndex.value] = item;

      document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
      debugger
      
      // dragging.value = null
    }

    function handleDragOver(e: any) {
      e.dataTransfer.dropEffect = 'move'

    }

    function handleDragEnter(e: any, item: any) {
      
      console.log("++++++++++++++++"+ dragging.value );
      e.dataTransfer.effectAllowed = 'move'

      if (item === dragging.value) {
        return
      }
      console.log(dragging.value);

      const newItems = props.dataList

      moveIndex.value = newItems.findIndex((i: any) => {
        return i === dragging.value
      })

      enterIndex.value = newItems.findIndex((i: any) => {
        return i === item
      })

      if (box.value !== enterIndex.value) {
        document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
      }

      document.querySelectorAll('ul>li')[enterIndex.value].setAttribute("class", "current")
      box.value = enterIndex.value
      // newItems.splice(dst, 0, ...newItems.splice(src, 1))
    }

    return {
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter
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

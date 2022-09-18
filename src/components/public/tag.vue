<template>
<div id="tagInputContainer" class="tagInputContainer pr120" style="position:relative">
  <div class="tag-box" v-for="(item, index) in tags" :key="index"><span>{{item}}</span> <a class="deltag" href="javascript:;" title="删除" @click="remove(index)" v-if="isEdit">×</a></div>
  <input v-model="model" v-if="isEdit" @blur="input" type="text" placeholder="请输入标签" style="border:0">
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
} from 'vue'

export default defineComponent({
  name: 'v-Tag',
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:tags'],
  setup(props, context) {
    let model: any = ref("")

    function input() {
      if (model.value !== "") {
        props.tags.push(model.value)
        model.value = ""
        context.emit('update:tags', props.tags)
      }
    }

    function remove(index: any) {
      props.tags.splice(index, 1)
      context.emit('update:tags', props.tags)
    }

    return {
      input,
      remove,
      model
    }
  }
})
</script>

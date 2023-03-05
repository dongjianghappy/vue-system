<template>
<div class="color-list color-wrap" style="height: 30px;">
  <input field="color" type="hidden" value="blue">
  <!-- <a class="color" data-color="all"><i class="all" style="border: 1px solid #eee;"></i>全部</a> -->
  <a class="color col-md-3" :class="{'bg-eee': color.indexOf(item.value) > -1}" @click="handleclick(item.value)" v-for="(item, index) in colorList" :key="index"><i :class="item.value" style="border: 1px solid #eee;"></i>{{item.name}}</a>
  <!-- <a class="color col-md-3" data-color="orange"><i class="orange" style="border: 1px solid #eee;"></i>橙色</a>
  <a class="color col-md-3" data-color="yellow"><i class="yellow" style="border: 1px solid #eee;"></i>黄色</a>
  <a class="color col-md-3" data-color="green"><i class="green" style="border: 1px solid #eee;"></i>绿色</a>
  <a class="color col-md-3" data-color="purple"><i class="purple" style="border: 1px solid #eee;"></i>紫色</a>
  <a class="color col-md-3" data-color="pink"><i class="pink" style="border: 1px solid #eee;"></i>粉色</a>
  <a class="color col-md-3" data-color="cyan"><i class="cyan" style="border: 1px solid #eee;"></i>青色</a>
  <a class="color bg-eee col-md-3" data-color="blue"><i class="blue" style="border: 1px solid #eee;"></i>蓝色</a>
  <a class="color col-md-3" data-color="brown"><i class="brown" style="border: 1px solid #eee;"></i>棕色</a>
  <a class="color col-md-3" data-color="white"><i class="white" style="border: 1px solid #eee;"></i>白色</a>
  <a class="color col-md-3" data-color="black"><i class="black" style="border: 1px solid #eee;"></i>黑色</a> -->
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Color',
  components: {

  },
  props: {
    colorList: {
      type: Array,
      default: []
    },
    color: {
      type: Array,
      default: []
    }
  },
  emits: ['update:color'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    function handleclick(param: any) {
      debugger
      if (props.color.indexOf(param) > -1) {
        let index = props.color.indexOf(param)
        props.color.splice(index, 1)
      } else {
        props.color.push(param)
      }    
      context.emit('update:color', props.color)
    }
    return {
      handleclick
    }
  }
})
</script>

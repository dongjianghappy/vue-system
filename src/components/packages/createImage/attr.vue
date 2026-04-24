<template>
      <div class="flex" style="background: #424568; margin-bottom: 1px;">
      <div style="width: 25px">
        <i class="iconfont icon-article" />
      </div>
      <div class="font12" style="flex: 1">
        {{data.name}}
      </div>
      <div class="align_right" style="width: 60px">
        <v-space>
          <i class="iconfont icon-recycle" @click="handleDelete(index)" />
          <i class="iconfont icon-shezhi" @click="handleVisible(data)" />
        </v-space>
      </div>
      </div>
      <ul class="edit-list p15" v-if="data.visible">
          <li class="mb15">
            <div class="mb5">
              内容
              <span class="right">
                <span class="p5" :class="{'bg-red': data.bold}" @click="handleClick('b')">B</span>
                <span class="mlr5 p5" :class="{'bg-red': data.italic}" @click="handleClick('i')">I</span>
                <span class="p5" :class="{'bg-red': data.underline}" @click="handleClick('u')">U</span>
              </span>
            </div>
            <input type="text" v-model="data.name" placeholder="请输入文本内容" class="input-sm input-full" />
          </li>       
          <li class="flex">
            <div class="mr25" style="flex: 1">
              <div class="mb5">字体大小{{data.size}}</div>
              <input type="range" v-model="data.size" placeholder="请输入字体大小" class="input-sm input-full" />
            </div>
            <div style="flex: 1">
              <div class="mb5">字体颜色</div>
              <div class="flex">
                <div class="mr5" style="flex: 1"><input type="text" v-model="data.color" placeholder="请输入颜色" class="input-sm input-full" /></div>
                <div style="width: 32px"><input type="color" v-model="data.color" style="    width: 32px; height: 32px;" /></div>
              </div>
            </div>
          </li>
          <li class="flex">
            <div class="mr25" style="flex: 1">
              <div class="mb5">距离顶部{{data.top}}</div>
              <input type="range" v-model="data.top" max="450" class="input-sm input-full" />
            </div>
            <div style="flex: 1">
              <div class="mb5">距离左侧{{data.left}}</div>
              <input type="range" v-model="data.left" max="600" class="input-sm input-full" />
            </div>
          </li>
          <li class="flex">
            <div class="mr25" style="flex: 1">
              <div class="mb5">透明度{{data.opacity}}</div>
              <input type="range" v-model="data.opacity" max="1" min=0 step="0.05" class="input-sm input-full" />
            </div>
            <div style="flex: 1">
              <!-- <div class="mb5">距离左侧{{data.left}}</div>
              <input type="range" v-model="data.left" max="600" class="input-sm input-full" /> -->
            </div>
          </li>
          <li class="flex">
            <div class="mr25" style="flex: 1">
              <div class="mb5">阴影X偏移{{data.offsetX}}</div>
              <input type="range" v-model="data.offsetX" min="-100" class="input-sm input-full" />
            </div>
            <div style="flex: 1">
              <div class="mb5">阴影Y偏移{{data.offsetY}}</div>
              <input type="range" v-model="data.offsetY" min="-100" class="input-sm input-full" />
            </div>
          </li>
          <li class="flex">
            <div class="mr25" style="flex: 1">
              <div class="mb5">模糊度{{data.shadowBlur}}</div>
              <input type="range" v-model="data.shadowBlur" class="input-sm input-full" />
            </div>
            <div style="flex: 1">
              <div class="mb5">阴影色</div>
              <div class="flex">
                <div class="mr5" style="flex: 1"><input type="text" v-model="data.shadowColor" placeholder="请输入阴影色" class="input-sm input-full" /></div>
                <div style="width: 32px"><input type="color" v-model="data.shadowColor" style="    width: 32px; height: 32px;" /></div>
              </div>
            </div>
          </li>
        </ul>
</template>

<script setup lang="ts">
import {
  useStore,
  ref,
  onMounted,
  watch
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit: any = defineEmits(['delete', 'collapse'])
const isShow: any = ref(false)

function handleDelete(param: any, index: any){
  emit('delete', param)
}

function handleVisible(param: any, index: any){
  emit('collapse', param)
}

function handleClick(param: any){
  switch(param){
    case 'b' :
      props.data.bold = !props.data.bold
      break
    case 'i' :
      props.data.italic = !props.data.italic
      break
    case 'u' :
      props.data.underline = !props.data.underline
      break
  }
}
</script>


<style lang="less">
.edit-list {
  background: #2a2d4a;
}
</style>
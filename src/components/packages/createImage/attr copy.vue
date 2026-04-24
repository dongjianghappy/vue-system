<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-shezhi" />
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" title="属性设置" :style="{width: 450, height: 400}" :hasfooter="false">
  <template v-slot:content>
  <ul class="edit-list p15">
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
        <input type="range" v-model="data.top" placeholder="请输入顶部距离" class="input-sm input-full" />
      </div>
      <div style="flex: 1">
        <div class="mb5">距离左侧{{data.left}}</div>
        <input type="range" v-model="data.left" placeholder="请输入左侧距离" class="input-sm input-full" />
      </div>
    </li>
    <li class="flex">
      <div class="mr25" style="flex: 1">
        <div class="mb5">阴影X偏移</div>
        <input type="text" v-model="data.offsetX" placeholder="请输入阴影X偏移" class="input-sm input-full" />
      </div>
      <div style="flex: 1">
        <div class="mb5">阴影Y偏移</div>
        <input type="text" v-model="data.offsetY" placeholder="请输入阴影Y偏移" class="input-sm input-full" />
      </div>
    </li>
    <li class="flex">
      <div class="mr25" style="flex: 1">
        <div class="mb5">模糊度</div>
        <input type="text" v-model="data.shadowBlur" placeholder="请输入模糊度" class="input-sm input-full" />
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
</v-dialog>
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
const isShow: any = ref(false)
</script>


<style lang="less">
.edit-list {
  background: #424568;
}
</style>
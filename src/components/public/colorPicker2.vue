<template>
<v-popover content="<i class='iconfont icon-font-colors' />" arrow="tb" offset="right" :move="-250" keys="calendar">
  <div class="color-list color-wrap" style="width: 300px; height: 150px;">
    <a class="col-md-3 color p5" @click="handleColor()">
      <div class="cl">
        <i class="size-32-24 all" style="border: 1px solid #eee;"></i>所有
      </div>
    </a>
    <a class="col-md-3 color p5" @click="handleColor(item.value)" v-for="(item, index) in COLOR" :key="index">
      <div class="cl">
        <i class="size-32-24" :class="item.value" style="border: 1px solid #eee;"></i>{{item.name}}
      </div>
    </a>
  </div>
</v-popover>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  defineEmits,
  ref,
  onMounted
} from 'vue'
import { useStore } from 'vuex'
import {
  COLOR
} from '@/assets/common_const'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit: any = defineEmits(['choose'])
const store = useStore()

function handleColor(param: any) {
  emit('choose', param)
}
</script>

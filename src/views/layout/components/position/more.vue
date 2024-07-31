<template>
<div class="relative mores" style="display: flex;">
  <i class="iconfont icon-group" />
  <div class="more-wrap bg-white absolute cl-999 plr15" style="top: 44px; right: 0; z-index: 100; box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);">
    <div class="col-md-3" v-for="(item, index) in module" :key="index">
      <div class="mtb10 align_center" style="flex: 1" @click="handleClick(item)">
        <div class="icon-wrap mb10" :style="`background: ${item.color}`">
          <i class="iconfont font28" :class="`icon-${item.icon}`"></i>
        </div>
        <div class="font12">{{item.name}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
} from '@/utils'
import {
  MODUDLE2
} from '@/assets/const'
export default defineComponent({
  name: 'v-More',
  props: {
    router: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const module: any = MODUDLE2

    function handleClick(param: any){
      props.router(param.module)
    }
    
    return {
      module,
      handleClick
    }
  }
})
</script>

<style lang="less">
.mores {
  display: block;
  height: 100%;

  i {
    padding-top: 50%;
    margin-top: -15px;
  }

  .more-wrap {
    width: 350px;
    height: 200px;
    padding: 25px;
    display: none;
    transition: 0.3s;
  }

  &:hover {
    .more-wrap {
      display: block;
    }

  }
}
</style>

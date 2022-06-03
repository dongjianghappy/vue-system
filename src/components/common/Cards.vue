<template>
<div class="ant-card ant-card-bordered font12" :class="className">
  <div class="ant-card-body">
    <div class="ant-statistic">
      <div class="ant-statistic-title">{{data.name}}</div>
      <div class="ant-statistic-content" style="color: rgb(63, 134, 0);">
        {{value}}</div>
    </div>
    <div class="align_right"><span @click="handelClick(data.module)">{{click}}</span></div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    name: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
        click: {
      type: String,
      default: ""
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();

    function handelClick(param: any) {
      context.emit('onClick', param)
    }
    return {
      handelClick
    }
  }
})
</script>

<template>
<span class="channel-name font16">
  <i class="iconfont" :class="`icon-${data.item.icon }`" />
  {{name || data.name}}
  <span v-if="data.item.hover">
    <span>
      <v-status :data="{ item: data.item || {}, coding: data.coding || 'O0000', field: data.field || 'status' }" :auth="true" />
    </span>
  </span>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Search',
  components: {
    Popover,
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    data: {
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

    function handleclick() {
      context.emit('onClick')
    }
    return {
      handleclick
    }
  }
})
</script>

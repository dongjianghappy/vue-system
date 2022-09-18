<template>
<span @click="handleclick" v-html="name" :class="{'set-gray': !auth}"></span>
<v-drawer v-model:show="isShow" ref="form" :title="title" :style="style" :hasfooter="false">
  <template v-slot:extra v-if="isShow">
    <slot name="extra"></slot>
  </template>
  <template v-slot:content v-if="isShow">
    <slot name="content" class="align_left"></slot>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  components: {
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    style: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['detail'],
  setup(props, context) {
    const isShow: any = ref(false)
    const data: any = ref({})
    function handleclick(param: any) {
      isShow.value = !isShow.value
    }
    return {
      isShow,
      handleclick,
      data
    }
  }
})
</script>

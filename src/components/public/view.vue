<template>
<transition>
  <div class="drawer-wrap align_left" :class="{'drawer-open': show}" style="top: 0">
    <v-mask v-show="show" v-model:isShow="isShow" />
    <template v-if="show">
      <div class="fixed" style=" background: #191919; display: block; z-index: 9001; opacity: 1;" :style="{top: '50px', right: '50px', bottom: '50px', left: '50px'}">
        <slot name="content"></slot>
      </div>
    </template>
  </div>
</transition>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  defineExpose,
  ref,
  watch,
  useStore
} from '@/utils'

const props: any = defineProps({
  style: {
    type: Object,
    default: () => {
      return {
        width: "450",
        height: "380"
      }
    }
  },
  contentStyle: {
    type: Object,
    default: () => {
      return {}
    }
  },
  action: {
    type: String,
    default: "add"
  },
  className: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  hasfooter: {
    type: Boolean,
    default: true
  },
  show: {
    type: Boolean,
    default: false
  },
  confirm: {
    type: Boolean,
    default: true
  },
  cancel: {
    type: Boolean,
    default: true
  },
  close: {
    type: Boolean,
    default: true
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  api: {
    type: String,
    default: ""
  },
})
defineExpose({init})
const emit: any = defineEmits(['update:show', 'submit'])
const store = useStore();
const window = {
  top: `${document.documentElement.clientHeight/2-parseInt(props.style.height)/2}px`,
  left: `${document.documentElement.clientWidth/2-parseInt(props.style.width)/2}px`
}
const isShow = ref(props.show)

watch([isShow], (newValues, prevValues) => {
  emit('update:show', false)
})

async function init(param: any) {
  let data = {}
  if (props.action === 'edit') {

    await store.dispatch('common/Fetch', {
      api: props.api || "detail",
      data: {
        ...props.data,
        ...param
      }
    }).then(res => {
      data = res.result
    })
  }
  return data
}

function handleClick() {
  emit('submit')
}

function handleCancel() {
  emit('update:show', false)
}
</script>

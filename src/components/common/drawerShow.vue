<template>
<span @click="handleclick" v-html="name" :class="{'set-gray': !auth}"></span>
<v-drawer v-model:show="isShow" ref="form" :title="title" :top="top" :width="width" :height="height" :submit="submit">
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
  getCurrentInstance,
  ref,
  onMounted,
  useStore
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
    top: {
      type: String,
      default: "0"
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "100%"
    },
    action: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    param: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['detail'],
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const data: any = ref({})
    const param: any = ref({})

    function handleclick(param: any) {

      // if (!props.auth) {
      //   return
      // }

      isShow.value = !isShow.value
      if (isShow.value && props.action === 'edit') {
        store.dispatch('common/Fetch', {
          api: "detail",
          data: {
            coding: props.data && props.data.coding,
            id: props.data && props.data.id
          }
        }).then(res => {
          data.value = res.result
          context.emit('detail', data.value)
        })

      }
    }

    function submit(params: any) {
      // for (let key in props.param) {
      //   param.value[key] = data.value[key]
      // }

      if (props.action !== "add") { //  && props.param
        param.value.id = data.value.id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data && props.data.coding,
          ...param.value
        }
      }).then(res => {
        isShow.value = false
        props.render()
      })

    }

    onMounted(() => {

      context.emit('detail', data.value)

    })

    return {
      isShow,
      handleclick,
      submit,
      data
    }
  }
})
</script>

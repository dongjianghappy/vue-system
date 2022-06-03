<template>
<span @click="handleclick" v-html="name"></span>
<Drawer v-model:show="isShow" ref="form" :title="title" :width="width" :submit="submit">
 
  <template v-slot:content v-if="isShow">
    <slot name="content"></slot>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
  useStore
} from '@/utils'
import {
  Drawer
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer
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
    width: {
      type: String,
      default: ""
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
    }
  },
  emits: ['detail'],
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const data: any = ref({})
    const param: any = ref({})

    function handleclick(param: any) {
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

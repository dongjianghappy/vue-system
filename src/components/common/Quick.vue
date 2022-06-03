<template>
<span :class="{inputline: isEdit, 'quick-edit': ssssss === 'input'}" :style="[style]" @click="getFocus" @blur="getBuler">{{value}}</span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  computed,

} from 'vue'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'FFdds',
  props: {
    style: {
      type: Object,
      default: () => {
        return {}
      }
    },
    width: {
      type: String,
      default: "100%"
    },
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "input"
    },
    data: {
      type: Array,
      default: () => {
        return
      }
    },
    render: {
      type: Function
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:user'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const dataList: any = ref(props.data)
    const namesss: any = ref(props.data)
    const store = useStore();
    let isEdit = ref(false)
    let ssssss: any = ref(props.type)

    function getFocus(e: any) {
      debugger
      ssssss.value = "input"
      if (!props.auth) {
        return
      }

      e.currentTarget.setAttribute("contenteditable", true)

      isEdit.value = true
      e.currentTarget.focus()
    }

    function getBuler(e: any) {
      isEdit.value = false
      ssssss.value = props.type
      if (namesss.value !== e.currentTarget.innerHTML) {
        store.dispatch('common/Fetch', {
          api: "changeData",
          data: {
            coding: namesss.value.coding,
            id: namesss.value.id,
            field: namesss.value.field,
            value: e.currentTarget.innerHTML
          }
        }).then((res: any) => {
          props.render && props.render()
        })
      }
    }

    return {
      isEdit,
      dataList,
      getFocus,
      getBuler,
      ssssss
    }
  }

})
</script>

<template>
<v-button v-model:show="isShow" :buttonType="buttonType" :disabled="auth">
  <i class="iconfont" :class="`icon-${icon} ${className}`" v-if="icon" />
  {{name}}
  </v-button>
<Dialog v-model:show="isShow" ref="form" width="400px" height="150px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <slot name="content">
      <div class="p20">{{message[operating] && message[operating].title}}</div>
    </slot>
  </template>
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore
} from '@/utils'
import {
  Dialog
} from '@/components/packages/index'
import confirm from '@/assets/modal_enum'

export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    // 按钮类型
    buttonType: {
      type: String,
      default: "text"
    },   
    icon: {
      type: String,
      default: ""
    },    
    className: {
      type: String,
      default: ""
    },          
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
    }, 
    api: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    operating: {
      type: String,
      default: ""
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const {
      data,
      operating,
      config
    }: any = props
    const message: any = confirm

    function handleclick(param: any) {

      if (typeof data.id === 'object' && data.id.length === 0) {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
        return
      }
      isShow.value = !isShow.value
    }

    function submit() {
      debugger
      
      let id = props.data.id
      if (typeof data.id === 'object' && data.id.length != 0) {
        id = data.id.toString()
      }
debugger
      store.dispatch('common/Fetch', {
        api: props.api,
        data: {
          ...props.data,
          id: id
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: message[operating] && message[operating].info
        })

        props.render()
        isShow.value = !isShow.value
      })

    }
    return {
      isShow,
      handleclick,
      submit,
      message
    }
  }
})
</script>

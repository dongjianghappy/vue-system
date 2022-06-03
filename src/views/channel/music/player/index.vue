<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-listen listen"></i>
</v-button>
<Dialog v-model:show="isShow" ref="form" title="东江音乐" width="1000px" height="600px" :confirm="true" :hasfooter="false" :cancel="true" @submit="submit" className="playTheme">
  <template v-slot:content v-if="isShow">
    <Index :data="data" />
  </template>
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  Dialog
} from '@/components/packages/index'
import Index from './components/index.vue'
import {
  TEXT_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog,
    Index
  },
  props: {
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
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const textType = TEXT_TYPE

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function submit(cancel: any) {
      props
      debugger
      const {
        id,
        remark,
        name,
        value,
        text_type,
        explanation
      } = detail.value
      const param = {
        id,
        remark,
        name,
        value,
        text_type,
        explanation
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: 'P0000',
          ...param
        }
      }).then(res => {
        props.render()
        cancel()
      })
    }    
    
    return {
      textType,
      isShow,
      detail,
      drawer,
      submit
    }
  }
})
</script>

<style>
.playTheme{
  background: #1b1b1b !important;
  color: #fff !important;
}
</style>
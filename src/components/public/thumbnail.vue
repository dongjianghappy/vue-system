<template>
<v-button v-model:show="isShow">
  <img :src="data.cover || data.image[0]" style="width: 100%; height: 150px;" @click="showImg(data)">
</v-button>
<v-layer v-model:isShow="showFlag" :data="Object.keys(detail).length > 0 ? detail : data" @prevOrNext="prevOrNext" v-if="showFlag" :type="type" :getNeighbor="getNeighbor" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
} from '@/utils'
export default defineComponent({
  name: 'v-Thumbnail',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "image"
    },
    coding: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const showFlag = ref(false)

    function showImg(param: any, i: any) {
      showFlag.value = !showFlag.value
    }

    function getNeighbor(type: any, callBack: any) {
      store.dispatch('common/Fetch', {
        api: "getNeighbor",
        data: {
          coding: props.coding,
          type: type,
          id: detail.value.id || props.data.id
        }
      }).then(res => {
        debugger
        detail.value = res.result
      })
    }

    return {
      isShow,
      detail,
      drawer,
      showFlag,
      showImg,
      getNeighbor
    }
  }
})
</script>

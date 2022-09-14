<template>
<v-button v-model:show="isShow">
  <span v-html="title"></span>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" action="edit" :title="detail.title" :data="data" :param="detail" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    内容
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch
} from '@/utils'
import {
  LINK_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {},
  props: {
    title: {
      type: String,
      default: ""
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
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const sourceType: any = LINK_TYPE
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      isShow,
      detail,
      drawer,
      sourceType
    }
  }
})
</script>

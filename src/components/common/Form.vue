<template>
<v-button @click="handleclick" v-if="type !== 'text'">{{name}}</v-button>
<span class="cursor" @click="handleclick" v-html="name" v-else></span>
<Dialog v-model:show="isShow" ref="form" :title="name" width="650px" height="500px" :confirm="true" :cancel="true" @submit="submit">

  <slot name="content">sdsd</slot>
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  watch
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
    type: {
      type: String,
      default: "button"
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
  },
  emits: ['update:cate'],
  setup(props, context) {
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    let current: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        current.value.name = "123123",
          current.value.value = "4324234"
        init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function choose(param: any) {
      current.value = param
    }

    function init() {
      store.dispatch('common/Fetch', {
        api: "cateList",
        data: {
          coding: "P0001"
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function submit() {
      const {
        data
      }: any = props
      data.detail.fid = current.value.value
      data.detail.parent = current.value.name
      isShow.value = !isShow.value
    }

    return {
      isShow,
      current,
      handleclick,
      choose,
      submit,
      dataList
    }
  }
})
</script>

<style scoped>
.current {
  background: #1890ff;
  border-radius: 2px;
  color: #fff;

}
</style>

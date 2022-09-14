<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="频道设置">
    </v-optionsbar>
  </div>

  <div class="module-content p25">
    
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore
} from '@/utils'
export default defineComponent({
  name: 'HomeViewdd',
  components: {},
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    coding: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: 0
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    // const dataList = computed(() => {
    //   return store.getters['basic/links'][props.type]
    // });
    const param = {
      name: "",
      url: "",
      apply_checked: 1
    }
    const checkedList: any = ref([])

    return {
      checkedList,
      param
    }
  }
})
</script>

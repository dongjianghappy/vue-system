<template>
<div class="module-content p15">
  <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
    <div class="p10" style="border: 1px solid #f0f0f0;">
      <div><img @click="handleClick(item)" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" style="width: 100%"></div>
      <div class="ptb15">{{item.name}}
        <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
      </div>
    </div>
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
import Detail from './detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
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

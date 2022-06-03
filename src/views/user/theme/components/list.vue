<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar :title="type === '0' ? '主题风格' : '背景特效'">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" v-if="type === '0'" />
        <Detail1 action='add' :data="{ coding }" :render="init" v-else />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div><img @click="handleClick(item)" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" style="width: 100%"></div>
        <div class="ptb15">{{item.name}}
          <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" v-if="type === '0'" />
          <Detail1 action="edit" :data="{id: item.id, coding}" :param="param" :render="init" v-else />
        </div>
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
import Detail1 from './detail1.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Detail1
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

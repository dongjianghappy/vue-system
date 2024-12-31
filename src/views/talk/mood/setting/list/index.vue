<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-list cl-white" />
  <!-- <i class="iconfont cl-white" :class="`icon-${data.icon}`" />{{data.name}} -->
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.name}状态词`" :style="{width: '450'}" :data="data" :render="render">
    <template v-slot:extra>
    <Detail :data="{fid: data.id, coding: coding.mood.system}" :render="init" />
  </template>
  <template v-slot:content v-if="isShow">
  <div v-for="(item, index) in dataList" :key="index">
    {{item.content}}
    <span class="right">
      <Detail action="edit" :data="{id: item.id, coding: coding.mood.system}" :render="init" /></span>
  </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
  codings
} from '@/utils'
import {
  tabsMood
} from '@/assets/const'
import Detail from './components/detail.vue'
import SpaceModal from '../../../space/components/modalSpace.vue'
  const props: any = defineProps({
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
    },
    auth: {
      type: Boolean,
      default: false
    }
  })
    const coding: any = codings
    const store = useStore();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding.mood.system,
          fid: props.data.id
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

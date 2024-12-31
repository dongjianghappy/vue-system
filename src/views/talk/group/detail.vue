<template>
<v-button v-model:show="isShow" :disabled="true">
  {{name}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="组类" :style="{width: '400'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <ul>
      <li class="ptb10" v-for="(item, index) in dataList" :key="index">
        <span>{{item.name}}<span class="ml10 cl-red">{{visibles[item.visible || 'public']}}</span></span>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
} from '@/utils'
import {
  visibles
} from '@/assets/const'

  const props: any = defineProps({
    name: {
      type: String,
      default: '所有组类'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const isShow: any = ref(false)
    const dataList: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
        init()
      }
    })

    function init() {
      store.dispatch('basic/Fetch', {
        api: 'customGroup',
        data: {
          coding: props.data.coding,
          uid: props.data.uid
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
</script>

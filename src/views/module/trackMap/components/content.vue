<template>
<v-button v-model:show="isShow" :disabled="auth">
  内容
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="内容管理" >
  <template v-slot:extra>
    <Detail :data="{artid: data.id, coding: coding.list}" :isRoot='true' :render="init" />
  </template>
  <template v-slot:content v-if="isShow">
    <List :source="detail.list" :dataList="detail.list" :handleAdd="handleAdd" :render="init" />
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
import List from './list.vue'
import Detail from './detail2.vue'
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
    coding: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Boolean,
      default: false
    }
  })
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const fileInfo: any = ref({})
    const detail: any = ref({})
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init(){
      store.dispatch('common/Fetch', {
        api: 'footprintDetail',
        data: {
          id: props.data.id
        }
      }).then(async res => {
        detail.value = res.result
      })
    }
</script>

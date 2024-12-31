<template>
<v-button v-model:show="isShow" :disabled="true">
  {{data.nickname}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.nickname}的留言板`" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div>
      <span class="mr10" :class="{'cl-red': currentTabs === 0}" @click="handleClick(0, {uid: data.uid})">给我留言的</span>
      <span  :class="{'cl-red': currentTabs === 1}" @click="handleClick(1, {from_uid: data.uid})">我留言的</span>
    </div>
    <div>
      <List :dataList="dataList" :data="{coding, currentTabs}" />
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  onMounted,
  watch,
  codings
} from '@/utils'
import {
  tabsUserMessageBoard
} from '@/assets/const'
import List from './list.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const isShow: any = ref(false)
    const coding: any = codings.talk.message_board;
    const dataList: any = ref({})
    const currentTabs: any = ref(0)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        currentTabs.value = 0
        dataList.value = []
        init({uid: props.data.uid})
      }
    })

    function handleClick(index: any ,param: any){
      currentTabs.value = index
      dataList.value = {}
      init(param)
    }

    // 初始化
    function init(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)
      
      store.dispatch('common/Fetch', {
        api: 'userMessageBoard',
        data: {
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
</script>

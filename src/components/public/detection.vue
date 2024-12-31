<template>
<v-button v-model:show="isShow" :disabled="true">
  检测
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="检测" :style="{width: '650', height: '500'}" :data="data" :hasfooter="false" @submit="submit">
  <template v-slot:content v-if="isShow">
    <div style="height: 410px">
      <div class="mb25 flex">
        <div style="flex: 1">{{title}}</div>
        <div class="w80" @click="handleClick">开始检测</div>
      </div>
      <div v-if="dataList.length">
        <div class="flex">
          <div style="flex: 1">名称</div>
          <div class="w80">过期时间</div>
        </div>
      <div class="pr10" style="height: 300px; overflow-y: auto">
        <div class="flex" v-for="(item, index) in dataList" :key="index">
          <div style="flex: 1">{{item.name}}</div>
          <div class="w80" >{{item.times}}</div>
        </div>
      </div>
      <div class="align_right">
        <span class="mr15">当前检测出{{dataList.length}} 条数据</span>
        <span @click="handleClose">立即处理</span>
      </div>
      </div>
      <div v-else>请点击开始检测按钮进行检测</div>
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
} from '@/utils'

  const props: any = defineProps({
    title: {
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
        return
      }
    },
  })
    const store = useStore()
    const isShow: any = ref(false)
    const dialog: any = ref(null)
    const dataList: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
      }
    })

    function handleClick() {
      
      store.dispatch('common/Fetch', {
        api: "detection",
        data: {
          coding: props.data.coding,
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    function handleClose(){
      store.dispatch('common/Fetch', {
        api: "updateDetection",
        data: {
          coding: props.data.coding,
        }
      }).then((res: any) => {
        props.render()
      })
    }
</script>

<template>
<v-button v-model:show="isShow" :disabled="true">
  <v-avatar :data="data" />{{data.nickname}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.nickname}的签到记录`" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:extra>
    
  </template>
  <template v-slot:content v-if="isShow">
    <div style="height: 461px">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-10">心情</td>
          <td class="col-md-2">日期</td>
        </tr>
        <tr v-for="(item, index) in dataList" :key="index">
          <td>
          {{item.name}}
          </td>
        <td>{{item.times}}</td>
        </tr>
      </table>
      <v-nodata :data="dataList" />
    </div>
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
      default: '评论'
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
        data: {
          coding: props.data.coding,
          uid: props.data.uid
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
</script>

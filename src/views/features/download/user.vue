<template>
<v-button v-model:show="isShow" :disabled="true">
  <v-avatar :data="data" />{{data.nickname}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.nickname}下载的`" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div style="height: 461px">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-10">下载内容</td>
          <td class="col-md-2">下载时间</td>
        </tr>
        <tr v-for="(item, index) in dataList" :key="index">
          <td>
            {{item.title}}
          </td> 
          <td>
            {{item.times}}
          </td>
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


  const props: any = defineProps({
    name: {
      type: String,
      default: '下载'
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
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
        init()
      }
    })

    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'articleRelatedUser',
        data: {
          coding: props.data.coding,
          id: props.data.artid || props.data.id,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

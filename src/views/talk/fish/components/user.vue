<template>
<v-button v-model:show="isShow" :disabled="true">
  <v-avatar :data="data" />{{data.nickname}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.nickname}养鱼记录`" :style="{width: '450'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-5">鱼名称</td>
        <td class="col-md-3">数量</td>
        <td class="col-md-2">消耗能量</td>
        <td class="col-md-2">状态</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.count}}
        </td>
        <td>
          {{item.energy}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />
        </td>
      </tr>
    </table>
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
      default: '收藏'
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
        init()
      }
    })

    function init() {
      store.dispatch('basic/Fetch', {
        api: "seaFishList"
      }).then(res => {
          dataList.value = res.result
      })
    }
</script>

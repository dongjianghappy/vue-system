<template>
<v-button v-model:show="isShow" :disabled="true">
  勋章({{data.num || 0}})
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`勋章列表`" :style="{width: '450'}" :hasfooter="false">
  <template v-slot:extra>
    <Detail :data="data" :render="init" />
  </template>
  <template v-slot:content v-if="isShow">
    <div style="height: 461px">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-8">名称</td>
          <td class="col-md-4">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>
            {{item.name}}
          </td>
          <td>
            <Detail action="edit" :data="{id: item.id, ...data}" :render="init" />
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
import Detail from "./detail.vue"


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
        data: {
          coding: props.data.coding,
          fid: props.data.fid,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

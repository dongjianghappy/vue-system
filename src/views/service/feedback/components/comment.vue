<template>
<v-button v-model:show="isShow" :disabled="true">
  评论({{data.praise}})
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="用户评论" :style="{width: '600'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div style="height: 461px">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-2">用户</td>
          <td class="col-md-6">评论内容</td>
          <td class="col-md-2">评论时间</td>
          <td class="col-md-2">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList" :key="index">
          <td>
            <v-avatar :data="item" />{{item.nickname}}
          </td>
          <td></td>
          <td>
            {{item.times}}
          </td>
          <td></td>
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
        api: 'commentUser',
        data: {
          coding: props.data.coding,
          id: props.data.id,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

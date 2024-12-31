<template>
<v-button v-model:show="isShow" :disabled="true">
  <v-avatar :data="data" />{{data.nickname}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.nickname}的日志`" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:extra>
    <Group :data="{...data, coding: data.coding.cate}" name="Ta创建的组类" />
  </template>  
  <template v-slot:content v-if="isShow">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-7">日志 </td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          【{{item.parent}}】{{item.title}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.art}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <span>
              <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: coding.art }" type="text" api="changeData" :render="init" operating="setTop" :auth="true"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
    codings,
  defineProps,
  ref,
  useStore,
  watch,

} from '@/utils'

import Group from '../../group/detail.vue'
  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const coding: any = codings.talk.journal;
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

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)
      store.dispatch('basic/Fetch', {
        api: 'journal',
        data: {
          id: props.data.id,
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
</script>

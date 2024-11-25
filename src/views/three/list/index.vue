<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="场景元素">
      <template v-slot:extraright>
        
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
      <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">元素名称</td>
        <td class="col-md-6">元素内容</td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td style="word-break: break-word;">
          {{item.content}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :disabled="false" />
        </td>
        <td>
          <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete" :auth="false"></v-confirm>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'


export default defineComponent({
  name: 'PartnerView',
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.three.scene_item;

    function init() {
      store.dispatch('basic/Fetch', {
        data: {
          coding: coding,
          page: 1,
          pagesize: 100
        }
      }).then((res: any) => {
        dataList.value = res.result || []
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      dataList,
      init
    }
  }
})
</script>

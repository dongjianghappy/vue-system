<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="临时采集列表">
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-7">标题</td>
        <td class="col-md-2">采集时间</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.title}}
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-space>
            <span>入库</span>
            <span>删除</span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  codings,
  useStore,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'TemListView',
  setup(props, context) {
    const coding: any = codings['collection'].artTem;
    const store = useStore();
    const route = useRoute();
    const dataList: any = ref([])

    function init() {
      const param: any = {
        coding,
        page: 1,
        pagesize: 10
      }

      if (route.query.fid) {
        param.fid = route.query.fid
      }

      store.dispatch('common/Fetch', {
        data: {
          ...param
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    onMounted(init)

    return {
      coding,
      dataList
    }
  }
})
</script>

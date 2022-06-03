<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="所有采集列表">
      <template v-slot:extraright>
        扩展值
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-23">
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
        <td>{{item.datetime}}</td>
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
  watch,
  codings,
  useStore,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'HomeViewdd',
  components: {},
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const coding: any = codings['collection'].artTem;
    const store = useStore();
    const route = useRoute();
    const dataList: any = ref([])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      init()
    })

    function init() {
      const param: any = {
        coding,
        page: 1,
        pagesize: 10
      }

      const {
        fid
      }: any = route.query
      if (fid) {
        param.fid = fid
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

<template>
  <div class="module-wrap">
    <div class="module-head">
      <v-optionsbar title="友情链接">
        <template v-slot:extraright>
          扩展值
        </template>
      </v-optionsbar>
    </div>
    <div class="module-content plr15">

      <table width="100%" class="table-striped table-hover col-left-12">
        <tr class="th">
          <td class="col-md-3">订单号</td>
          <td class="col-md-4">订单名称</td>
          <td class="col-md-1">类型</td>
          <td class="col-md-2">价格(元/周期)</td>
          <td class="col-md-1">下单日期</td>
          <td class="col-md-1">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList" :key="index">
          <td>
            {{item.number}}
          </td>
          <td>
            {{item.name}}
          </td>
          <td>{{item.type}}</td>
          <td>{{item.price}}</td>
          <td>{{item.start_time}}</td>
          <td>
            <span>处理下单</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'

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
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: "P0007",
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    function edit(param: any) {

    }

    onMounted(init)

    return {
      dataList,
      edit

    }
  }
})
</script>

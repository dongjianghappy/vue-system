<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="代码库">
      <template v-slot:extraright>
        扩展值
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15 font12">

    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 选择</td>
        <td class="col-md-2">网站名称 </td>
        <td class="col-md-3">链接地址</td>
        <td class="col-md-1">价格(元/月)</td>
        <td class="col-md-2">结束日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td></td>
        <td>
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding: 'P0003' }" />
        </td>
        <td>
          <v-quick :value="item.url" :data="{ id: item.id, field: 'url', coding: 'P0003' }" />
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <span>编辑</span>
          <span>删除</span>
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
          coding: "P0003",
          method: 0,
          apply_checked: 1,
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

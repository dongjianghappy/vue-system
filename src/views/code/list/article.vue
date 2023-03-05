<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="系统消息">
      <template v-slot:extraright>
        扩展值
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-23">
      <tr v-for="(item, index) in dataList" :key="index">
        <td class="col-md-1"> <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" /></td>
        <td class="col-md-10">{{item.title}} </td>

        <td class="col-md-1">已读</td>
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
          coding: "Q0006",
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

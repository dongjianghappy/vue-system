<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="用户等级">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-4">
      <tr class="th">
        <td class="col-md-1">等级</td>
        <td class="col-md-2">等级图标</td>
        <td class="col-md-1">登录天数</td>
        <td class="col-md-8">描述</td>
      </tr>

      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.level}}
        </td>
        <td v-html="item.icon"></td>
        <td>
          {{item.time}}
        </td>
        <td>{{item.description}}</td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
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
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = proxy.$coding['user'].group;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "userGroup",
        data: {
          page: 1,
          pagesize: 100
        }
      }).then(res => {
      dataList.value = res.result
    })
  }

  onMounted(init)

  return {
    coding,
    dataList,
    checkedList,
    init
  }
}
})
</script>

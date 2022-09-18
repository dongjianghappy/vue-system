<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="核心词">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">id</td>
        <td class="col-md-8">名称</td>
        <td class="col-md-1">属性</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.id}}
        </td>
        <td>
          {{item.name}}
        </td>
        <td>
          <DetailFlag action='add' :data="{item, coding }" :render="init" />
        </td>
        <td>
          <span>删除</span>
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
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import DetailFlag from './components/detailFlag.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    DetailFlag
  },
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings['tag'];
    const route = useRoute();

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/tag/core') {
        init('1')
      } else if (route.path === '/admin/tag/target') {
        init('2')
      } else {
        init('0')
      }
    })

    function init(param: any) {
      store.dispatch('common/Fetch', {
        data: {
          coding: "O0003",
          type: param,
          page: 1,
          pagesize: 50
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    onMounted(() => init('1'))

    return {
      dataList,
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="职位管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">编号</td>
        <td class="col-md-3">职位名称</td>
        <td class="col-md-1">部门</td>
        <td class="col-md-1">人数</td>
        <td class="col-md-2">发布时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
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
        <td>{{item.department}}</td>
        <td>{{item.number}}</td>
        <td>{{item.datetime}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding }" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
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
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const coding: any = codings['service'].job;
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    onMounted(init)

    return {
      dataList,
      coding,
      init
    }
  }
})
</script>

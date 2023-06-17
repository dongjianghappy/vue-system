<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="求职简历">
      <template v-slot:extraright>
        扩展值
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">编号</td>
        <td class="col-md-1">姓名</td>
        <td class="col-md-1">性别</td>
        <td class="col-md-2">年龄</td>
        <td class="col-md-1">学历</td>
        <td class="col-md-2">专业</td>
        <td class="col-md-2">申请时间</td>
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
          {{item.username}}
        </td>
        <td>{{item.sex}}</td>
        <td>{{item.birthday}}</td>
        <td>{{item.educational}}</td>
        <td>{{item.specialty}}</td>
        <td>{{item.datetime}}</td>
        <td>
          <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
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

export default defineComponent({
  name: 'ResumView',
  setup(props, context) {
    const store = useStore();
    const coding: any = codings['service'].resume;
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
      coding
    }
  }
})
</script>

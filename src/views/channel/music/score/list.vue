<template>
<div>
    <table class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-7">简谱名称</td>
        <td class="col-md-1">音调 </td>
        <td class="col-md-1">种类</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}} <i class="iconfont icon-img"></i>
        </td>
        <td>{{item.tune}}调</td>
        <td>{{item.type}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  channels
} from '@/utils'
import Detail from './components/detail.vue'

  const props: any = defineProps({
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore();
    const coding: any = channels().coding.score;
    const checkedList: any = ref([])
</script>

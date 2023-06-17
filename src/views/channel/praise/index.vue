<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="点赞管理">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-2">用户</td>
        <td class="col-md-7">点赞微博</td>
        <td class="col-md-2">点赞时间</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          <v-avatar :data="item" />{{item.nickname}}
        </td>
        <td>
          {{item.summary}}
        </td>
        <td>
          {{item.times}}
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList" :render="init" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  ref,
  channels
} from '@/utils'
export default defineComponent({
  name: 'HomeViewdd',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = channels().coding;
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        api: 'articleRelated',
        data: {
          coding: coding.art,
          name: 'praise',
          page: 1,
          pagesize: 10
        }
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

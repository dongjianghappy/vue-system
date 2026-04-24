<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="勋章管理">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding: coding.cate }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-9">勋章名称</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding: coding.cate }" :auth="true" />
        </td>
        <td>
          <v-space>
            <List :data="{ fid: item.id, coding: coding.list }" />
            <span>
              <Detail action="edit" :data="{id: item.id, coding: coding.cate}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  useStore,
  ref,
  codings
} from '@/utils'
import List from './components/list.vue'
import Detail from './components/detailCate.vue'
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.medal;

    function init() {
      store.dispatch('basic/Fetch', {
        data: {
          coding: coding.cate
        }
      }).then((res: any) => {
        debugger
        dataList.value = res.result
      })
    }

    onMounted(init)
    
</script>

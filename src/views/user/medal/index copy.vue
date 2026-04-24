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
    <table class="table-striped table-hover col-left-14">
      <tr class="th">
        <td class="col-md-1">勋章名称</td>
        <td class="col-md-1">图标</td>
        <td class="col-md-3">条件</td>
        <td class="col-md-4">描述</td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          <img :src="item.image[0]" class="radius-8" style="width: 50px; height: 50px;" />
        </td>
        <td>
          {{item.award_condition}}
        </td>
        <td>
          {{item.description}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-space>
            <List :data="{ fid: item.id, coding: data.coding }" />
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
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

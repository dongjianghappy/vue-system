<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="放养记录">
      <template v-slot:extraright>
        <Detail />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-6">鱼名称</td>
        <td class="col-md-1">数量</td>
        <td class="col-md-1">消耗能量</td>
        <td class="col-md-1">状态</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :index="index">
        <td>
          <User :data="item" />
        </td>
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.count}}
        </td>
        <td>
          {{item.energy}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="auth.checked('edit')" />
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'
import Detail from './components/index.vue'
import User from './components/user.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = codings.fish.record;
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('partner')

    function init() {
      store.dispatch('basic/Fetch', {
        api: "seaFishList"
      }).then(res => {
          dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })
</script>

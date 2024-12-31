<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="意图管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">意图名称</td>
        <td class="col-md-6">话术</td>
        <td class="col-md-2">发布状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.speech}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding }" :render="init" :auth="true" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore,
  useRouter,
  codings
} from '@/utils'
import Detail from './components/detail.vue'

    const coding: any = "Q0015";
    
    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "speechLib",
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)
</script>

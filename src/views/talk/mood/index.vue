<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="心情">
      <template v-slot:extraright>
        <Detail />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-123">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-8">心情</td>
        <td class="col-md-2">日期</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :index="index">
        <td>
          <UserBookmark :data="{...item, coding: coding}" />
        </td>
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.times}}
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
  computed,
  ref,
  useStore,
  codings
} from '@/utils'
import {
  visibles
} from '@/assets/const'
import UserBookmark from './components/list.vue'
import Detail from './setting/index.vue'

    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = ref({});
    const coding: any = codings.user.mood
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('partner')

    function init() {
      store.dispatch('basic/Fetch', {
        api: 'moodList',
        data: {
          page: 1,
          pagesize: 10
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })
</script>

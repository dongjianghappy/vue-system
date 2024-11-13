<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="放养记录">
      <template v-slot:extraright>
        
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-8">鱼名称</td>
        <td class="col-md-1">数量</td>
        <td class="col-md-1">消耗能量</td>
        <td class="col-md-1">状态</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :index="index">
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

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings
} from '@/utils'
export default defineComponent({
  name: 'PartnerView',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = codings.fish.record;
    const checkedList: any = ref([])

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

    return {
      coding,
      dataList,
      checkedList,
      init,
      auth: proxy.$auth.init('partner')
    }
  }
})
</script>

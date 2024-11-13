<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="物品管理">
      
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" :auth="false" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-9">物品</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :disabled="false" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" :auth="false" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete" :auth="false"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
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
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.three.item;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        data: {
          coding: coding,
          page: 1,
          pagesize: 100
        }
      }).then((res: any) => {
        dataList.value = res.result || []
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

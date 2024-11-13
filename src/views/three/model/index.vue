<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="模型管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" :auth="false" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-9">模型</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding: coding.model }" :disabled="false" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" :auth="false" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.model}" api="delete" :render="init" operating="delete" :auth="false"></v-confirm>
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
    const coding: any = codings.three;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        state: 'scene',
        data: {
          coding: coding.model,
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

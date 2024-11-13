<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="场景管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" :auth="false" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">场景名称</td>
        <td class="col-md-5">场景描述</td>
        <td class="col-md-2">背景色</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.description}}
        </td>
        <td>
          {{item.background_color}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :disabled="false" />
        </td>
        <td>
          <v-space>
            <span><Info :data="{id: item.id, coding}" :title="item.name" /></span>
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
import Info from '../components/setting.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Detail,
    Info
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.three.scene;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        state: 'scene',
        data: {
          coding,
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

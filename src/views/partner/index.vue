<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="合作伙伴">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">顺序 </td>
        <td class="col-md-7">伙伴名称</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
        <tr v-for="(item, index) in dataList.list" class="dragObj" :key="index" draggable="true" :index="index">
          <td>
            <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
          </td>
          <td>
            <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding }" :auth="auth.checked('edit')" />
          </td>
          <td>
            <v-quick :value="item.url" :data="{ id: item.id, field: 'url', coding }" :style="{width: '50%'}" :auth="auth.checked('edit')" />
          </td>
          <td>
            <v-switch :data="{ item, field: 'status', coding }" :auth="auth.checked('edit')" />
          </td>
          <td>
            <v-space>
              <span>
                <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" :auth="auth.checked('edit')" />
              </span>
              <span>
                <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
              </span>
            </v-space>
          </td>
        </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :pagination="{total: 10, page: 10, pagesize: 10}" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" :auth="auth" />
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
  name: 'HomeViewdd',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings['partner'];
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
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

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="书签">
      <template v-slot:extraright>
        
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-3">伙伴名称</td>
        <td class="col-md-7">地址</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.url}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
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
  name: 'PartnerView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings.talk.favorites.art
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

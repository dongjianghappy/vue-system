<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="日志管理">
      <template v-slot:extraright>
        <v-space>
          <Stationery :data="{ coding }" :render="init" :auth="auth.checked('add')" />
          <Template :data="{ coding }" :render="init" :auth="auth.checked('add')" />          
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-7">日志 </td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.title}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <span>
              <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding }" type="text" api="changeData" :render="init" operating="setTop" :auth="true"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
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
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Template from './components/template.vue'
import Stationery from './stationery/index.vue'
// import Editor from '@/components/packages/editor/index.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Template,
    Stationery
    // Editor
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref({})
    const coding: any = codings.talk.journal.art;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        api: 'journal',
        data: {
          page: 1,
          pagesize: 25
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init,
      auth: proxy.$auth.init('announcement')
    }
  }
})
</script>

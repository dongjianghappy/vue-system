<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="网站管理">
      <template v-slot:extraright>
        <Detail :data="{ coding: coding.list }" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">网站名称 </td>
        <td class="col-md-5">域名 </td>
        <td class="col-md-2">上线时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>{{item.domain}}</td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding: coding.list }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding: coding.list}" :render="init" :auth="auth.checked('edit')" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.list}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <span>
              <Channel :data="{fid: item.id, coding}" :name="item.name" :auth="true" />
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import Channel from './channel/index.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Channel
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.site;
    const store = useStore();
    const dataList = computed(() => store.getters['basic/announcement']);

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        state: 'announcement',
        data: {
          coding: coding.list,
          ...params
        }
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      init,
      auth: proxy.$auth.init('announcement')
    }
  }
})
</script>

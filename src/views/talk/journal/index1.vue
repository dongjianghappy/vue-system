<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="日志管理">
      <template v-slot:extraright>
        <v-space>
          <v-search field="content" placeholder="日志查找" :render="init" />
          <Stationery :data="{ coding: coding.art }" :render="init" :auth="auth.checked('add')" />
          <Template :data="{ coding: coding.art }" :render="init" :auth="auth.checked('add')" />          
          <Group :data="{coding: coding.cate}" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-5">日志 </td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
         <User :data="item" />
        </td>
        <td>
          【{{item.parent}}】{{item.title}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.art}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <span>
              <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: coding.art }" type="text" api="changeData" :render="init" operating="setTop" :auth="true"></v-confirm>
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

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import User from './components/user.vue'
import Template from './components/template.vue'
import Stationery from './stationery/index.vue'
import Group from '../group/detail.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref({})
    const coding: any = codings.talk.journal;
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('announcement')

    function init(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)
      store.dispatch('basic/Fetch', {
        api: 'journal',
        data: {
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(init)
</script>

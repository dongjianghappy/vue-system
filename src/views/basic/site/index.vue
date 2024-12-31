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
      <tr v-for="(item, index) in dataList" :key="index">
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
    <v-nodata :data="dataList || []" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import Channel from './channel/index.vue'

    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.site;
    const store = useStore();
    const dataList = computed(() => store.getters['basic/site'].list);
    const auth: any = proxy.$auth.init('website')

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 10
      }
      Object.assign(params, param)

      store.dispatch('basic/getWebsite', {
        data: {
          coding: coding.list,
        }
      })
    }

    onMounted(init)
    
</script>

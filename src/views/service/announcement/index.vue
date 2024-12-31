<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="公告通知">
      <template v-slot:extraright>
        <v-space>
          <v-condition name="位置" field="display_location" :enums="[{name: '网站', value: '0'}, {name: '微博', value: '1'}]" :render="init" />
          <Detail :data="{ coding }" :render="init" :auth="auth.checked('add')" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-6">公告通知 </td>
        <td class="col-md-2">发布时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          【<span v-if="item.display_location === '1'">微博</span>
          <span v-else>网站</span>】
          <span className="mr5 cl-red" v-if="item.type === '1'">公告</span>
          <span className="mr5 cl-green" v-else>通知</span>
          {{item.title}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :render="init" :auth="auth.checked('edit')" />
            </span>
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
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" :auth="auth" />
  </div>
</div>
</template>

<script setup lang="ts">
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
import Detail from './components/detail.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['basic/announcement']);
    const coding: any = codings['service'].announcement;
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('announcement')

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 25
      }
      Object.assign(params, param)
      store.dispatch('basic/Fetch', {
        state: 'announcement',
        data: {
          coding,
          ...params
        }
      })
    }

    onMounted(init)
</script>

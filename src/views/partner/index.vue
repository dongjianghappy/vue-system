<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="合作伙伴">
      <template v-slot:extraright>
        <v-space>
          <Instructions module="partner" />
          <Detail :data="{ coding }" :render="init" :auth="auth.checked('add')" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-5">伙伴名称</td>
        <td class="col-md-2">开始时间</td>
        <td class="col-md-1">期限</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
          <!-- <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding }" :style="{width: '35%'}" :auth="auth.checked('edit')" /> -->
        </td>
        <td>{{item.start_time}}</td>
        <td>{{item.term === '0' ? '永久' : '三年'}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :render="init" :auth="auth.checked('edit')" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <v-popover content="联系方式" arrow="tb" offset="right" :move="-450" :keys="`static_${index}`">
              <div class="font14" style="width: 500px;">
                <table class="table-striped table-hover col-left-1">
                  <tr>
                    <td class="col-md-5">联系人</td>
                    <td class="col-md-3">电话</td>
                    <td class="col-md-3">地址</td>
                  </tr>
                  <tr>
                    <td>{{item.contacts}}</td>
                    <td>{{item.tel}}</td>
                    <td>{{item.address}}</td>
                  </tr>
                </table>
              </div>
            </v-popover>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :pagination="{total: 10, page: 10, pagesize: 10}" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" :auth="auth" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  codings
} from '@/utils'
import Instructions from '../links/components/instructions.vue'
import Detail from './components/detail.vue'
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings.partner;
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('partner')

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
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="书签">
      <template v-slot:extraright>
        <Group :data="{coding: coding.cate}" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-123">
      <tr class="th">
        <td class="col-md-2">用户</td>
        <td class="col-md-8">标题</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          <UserBookmark :data="{...item, coding: coding}" />
        </td>
        <td>
          【{{item.parent}}】{{item.name}}
          <span class="ml10 cl-red">{{visibles[item.visible || 'public']}}</span>
          <span class="ml10" @click="visit(item)">查看</span>
        </td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.art}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
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
import {
  visibles
} from '@/assets/const'
import UserBookmark from './components/list.vue'
import Group from '../group/detail.vue'

    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = ref({});
    const coding: any = codings.talk.favorites
    const checkedList: any = ref([])
    const auth: any = proxy.$auth.init('partner')

    function visit(param: any) {
      window.open(param.url)
    }

    function init() {
      store.dispatch('basic/Fetch', {
        api: 'bookmark',
        data: {
          page: 1,
          pagesize: 10
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })
</script>

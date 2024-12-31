<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="交换友链">
      <template v-slot:extraright>
      <v-space>
        <v-search :render="render" field="name" />
        <v-condition name="网站" icon="select" field="website" :enums="website" :render="render" />
        <Instructions module="link" />
        <Detail action='add' :data="data" :render="render" :auth="auth.checked('add')" />
      </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 选择</td>
        <td class="col-md-2">网站名称 </td>
        <td class="col-md-6">链接地址</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
          <!-- <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding }" :auth="auth.checked('edit')" /> -->
        </td>
        <td>
          {{item.url}}
          <!-- <v-quick :value="item.url" :data="{ id: item.id, field: 'url', coding }" :auth="auth.checked('edit')" /> -->
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{id: item.id, ...data }" :render="render" :auth="auth.checked('edit')" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <v-popover content="更多" arrow="tb" offset="right" :move="-450" :keys="`static_${index}`">
              <div class="font14" style="width: 500px;">
                <table class="table-striped table-hover col-left-1">
                  <tr>
                    <td class="col-md-1">ID</td>
                    <td class="col-md-5">展示站点</td>
                    <td class="col-md-3">站长</td>
                    <td class="col-md-3">联系方式</td>
                  </tr>
                  <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.website}}</td>
                    <td>{{item.webmaster}}</td>
                    <td>{{item.qq}}</td>
                  </tr>
                </table>
              </div>
            </v-popover>
          </v-space>
        </td>
      </tr>
    </table>
    <v-loading :loading="data.loading" :dataList="dataList.list"  />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, ...data }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList.list" :render="render" v-if="dataList.list && dataList.list.length > 0" :auth="auth" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore,
  codings
} from '@/utils'
import Instructions from './instructions.vue'
import Detail from './detail.vue'
  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const coding: any = codings.links
    const store = useStore();
    const website = computed(() => store.getters['basic/site'].tabs);
    const dataList = computed(() => store.getters['basic/links']['link1'] || []);

    const checkedList: any = ref([])
</script>

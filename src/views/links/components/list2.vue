<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="出售友链">
      <template v-slot:extraright>
        <v-space>
          <v-search :render="render" field="name" />
          <v-detection :data="{coding}" title="检测已过期的出售友情链接" :render="render" />
          <Order :data="{coding, type: 'link'}" title="友情链接订单列表" :render="render" />
          <v-condition name="网站" icon="select" field="website" :enums="website" :render="render" />
          <v-condition name="平台" icon="select" field="source" :enums="LINK_TYPE" :render="render" />
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
        <td class="col-md-3">链接地址</td>
        <td class="col-md-1">价格</td>
        <td class="col-md-2">结束日期</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
          <!-- <v-quick :value="item.name" :data="{ id: item.id, field: 'name', ...data }" :auth="auth.checked('edit')" /> -->
        </td>
        <td>
          {{item.url}}
          <!-- <v-quick :value="item.url" :data="{ id: item.id, field: 'url', ...data }" :auth="auth.checked('edit')" /> -->
        </td>
        <td>{{item.price}}</td>
        <td>{{item.datetime}}</td>
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
            <v-popover content="更多" arrow="tb" offset="right" :move="-500" :keys="`static_${index}`">
              <div class="font14" style="width: 550px;">
                <table class="table-striped table-hover col-left-1">
                  <tr>
                    <td class="col-md-1">ID</td>
                    <td class="col-md-4">展示站点</td>
                    <td class="col-md-2">平台</td>
                    <td class="col-md-2">出售次数</td>
                    <td class="col-md-1">站长</td>
                    <td class="col-md-2">联系方式</td>
                  </tr>
                  <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.website}}</td>
                    <td>{{item.source}}</td>
                    <td>{{item.sell}}</td>
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
    <v-loading :loading="data.loading" :dataList="dataList.list" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList.list" :render="render" v-if="dataList.list && dataList.list.length > 0" :auth="auth" />
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
import {
  LINK_TYPE
} from '@/assets/enum'
import Instructions from './instructions.vue'
import Order from '../../order/components/detail.vue'
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
    const store = useStore();
    const coding: any = codings.links
    const website = computed(() => store.getters['basic/site'].tabs);
    const dataList = computed(() => store.getters['basic/links']['link2'] || []);

    const checkedList: any = ref([])
</script>

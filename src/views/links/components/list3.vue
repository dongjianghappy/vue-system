<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="申请友链">
      <template v-slot:extraright>
      <v-space>
        <Instructions module="link" />
        <Detail action='add' :data="data" :render="init" :auth="auth.checked('add')" />
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
        <td class="col-md-1">站长</td>
        <td class="col-md-2">联系方式</td>
        <td class="col-md-2">申请时间</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.url}}
        </td>
        <td>{{item.webmaster}}</td>
        <td>{{item.qq}}</td>
        <td>
          {{item.datetime}}
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="审核" :data="{id: item.id, ...data }" type="text" api="applyCheck" :render="render" operating="check" :auth="auth.checked('audit')"></v-confirm>
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-loading :loading="data.loading" :dataList="dataList.list" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  computed,
  useStore
} from '@/utils'
import Instructions from './instructions.vue'
import Detail from './detail.vue'
  const props: any =defineProps({
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
    const dataList = computed(() => store.getters['basic/links']['link3']);
    const checkedList: any = ref([])
</script>

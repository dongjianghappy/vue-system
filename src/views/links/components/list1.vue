<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="交换友链">
      <template v-slot:extraright>
        <v-search :render="render" field="name" />
        <v-condition name="网站" icon="select" field="website" :enums="siteEnum" :render="render" />
        <Detail action='add' :data="data" :render="init" :siteList="siteList" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table width="100%" class="table-striped table-hover col-left-23">
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
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', ...data }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-quick :value="item.url" :data="{ id: item.id, field: 'url', ...data }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', ...data }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{id: item.id, ...data }" :render="render" :siteList="siteList" :auth="auth.checked('edit')" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
            <v-popover content="更多" arrow="tb" offset="right" :move="-450" :keys="`static_${index}`">
              <div class="font14" style="width: 500px;">
                <table width="100%" class="table-striped table-hover col-left-1">
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
    <v-loading :loading="loading" :dataList="dataList.list"  />
    <!-- <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" /> -->
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, ...data }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList.list" :render="render" v-if="dataList.list && dataList.list.length > 0" :auth="auth" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore
} from '@/utils'
import {
  SERVER_NAME
} from '@/assets/enum'
import Detail from './detail.vue'
export default defineComponent({
  name: 'ListView',
  components: {
    Detail,
  },
  props: {
    data: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
    siteList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    siteEnum: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => {
      debugger
      return store.getters['basic/links']['link1'] || []
    });

    const checkedList: any = ref([])

    return {
      dataList,
      checkedList
    }
  }
})
</script>

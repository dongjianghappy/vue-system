<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="申请友链">
      <template v-slot:extraright>
        <Detail action='add' :data="data" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 选择</td>
        <td class="col-md-2">网站名称 </td>
        <td class="col-md-3">链接地址</td>
        <td class="col-md-1">站长</td>
        <td class="col-md-2">联系方式</td>
        <td class="col-md-1">申请时间</td>
        <td class="col-md-2">操作</td>
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
    <v-loading :loading="loading" :dataList="dataList.list" />
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
import Detail from './detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
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
      return store.getters['basic/links']['link3']
    });
    const checkedList: any = ref([])

    return {
      dataList,
      checkedList
    }
  }
})
</script>

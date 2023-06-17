<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-7">名称</td>
    <td class="col-md-2">发布时间</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr class="tr-list" v-for="(item, index) in dataList.list" :key="index">
    <td>
      <div><label class="ant-checkbox-wrapper"><span class="ant-checkbox"><input type="checkbox" class="ant-checkbox-input" value=""><span class="ant-checkbox-inner"></span></span></label></div>
    </td>
    <td>{{item.title}}<i class="iconfont icon-img"></i><i class="iconfont icon-article"></i></td>
    <td>{{item.times}}</td>

    <td>
      <v-space>
        <span>
          <v-confirm name="审核" :data="{id: item.id, management_checked: 1, coding: data.coding.art }" type="text" api="checkContent" :render="render" operating="check" :auth="auth.checked('audit')"></v-confirm>
        </span>
        <span>
          <ReturnDialog :data="{id: item.id, management_checked: -1,  coding: data.coding.art }" :render="render" :auth="auth.checked('return')" />
        </span>
      </v-space>
    </td>
  </tr>
</table>
<v-nodata :data="dataList.list || []" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute,
  computed
} from '@/utils'
import ReturnDialog from "./returnDialog.vue"
export default defineComponent({
  name: 'v-Search',
  components: {
    ReturnDialog
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },    
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();

    const dataList = computed(() => {
      return store.getters[`channel/${props.data.module}`]['auditList']
    });

    function handleclick() {
      context.emit('onClick')
    }
    return {
      handleclick,
      dataList
    }
  }
})
</script>

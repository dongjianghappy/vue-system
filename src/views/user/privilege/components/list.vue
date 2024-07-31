<template>
<table class="table-striped table-hover col-left-12">
  <tr class="th">
    <td class="col-md-2">名称</td>
    <td class="col-md-1">图标</td>
    <td class="col-md-6">应用功能关联</td>
    <td class="col-md-1">状态</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td>
      <i class="iconfont" :class="`icon-${item.icon}`" />
      {{item.name}}</td>
    <td>{{item.description}}</td>
    <td>
      {{item.app}}
    </td>
    <td>
      <v-switch :data="{ item, field: 'status', coding: coding }" :auth="true" />
    </td>
    <td>
      <Detail action="edit" :data="{id: item.id, coding}" :render="init" />
    </td>
  </tr>
</table>
<v-nodata :data="dataList.list" />
</template>

<script lang="ts">
import {
  getCurrentInstance,
  defineComponent,
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'
import Detail from './detail.vue'
export default defineComponent({
  name: 'v-List',
  components: {
    Detail
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = codings.user.privilege;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 10,
          type: props.index
        }
      }).then((res) => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      dataList,
      checkedList,
      init,
      auth: proxy.$auth.init('partner')
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="交换友链">
      <template v-slot:extraright>
        <Detail action='add' :data="data" :render="init" />
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
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', ...data }" />
        </td>
        <td>
          <v-quick :value="item.url" :data="{ id: item.id, field: 'url', ...data }" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', ...data }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, ...data }" :render="render" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, ...data }" :sorceData="dataList.list" :render="render" v-if="dataList.list && dataList.list.length > 0" />
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
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => {
      debugger
      return store.getters['basic/links']['link2'] || []
    });

    const checkedList: any = ref([])

    return {
      dataList,
      checkedList
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="管理员">
      <template v-slot:extraright>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-3">用户</td>
        <td class="col-md-2">会员账号</td>
        <td class="col-md-2">管理员类型</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td style="display: flex">
          <v-avatar :data="item" :condition="{tag: item.role !== '0', value: '员'}"></v-avatar>
          <div class="pl5" style="flex: 1; height: 32px; line-height: 32px; display: inline-block;">
            {{item.nickname}}
          </div>
        </td>
        <td>
          {{item.account}}
        </td>
        <td>{{gradeList[item.role]}}</td>
        <td>
          <Detail action="edit" :data="{uid: item.account }" :render="render" />
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    <v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.pages, page: dataList.page ||  1, pagesize: 25}" :sorceData="dataList" :render="render" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
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
    }
  },
  setup(props, context) {
    const checkedList: any = ref([])
    const store = useStore()
    const dataList = computed(() => {
      return store.getters['user/manageList']
    });
    const gradeList = computed(() => {
      return store.getters['user/role']
    });

    function init() {
      store.dispatch('user/roleAction', {
        data: {
          coding: props.data.coding.role,
          page: 1,
          pagesize: 10
        }
      })
    }

    onMounted(init)

    return {
      checkedList,
      dataList,
      gradeList
    }
  }
})
</script>

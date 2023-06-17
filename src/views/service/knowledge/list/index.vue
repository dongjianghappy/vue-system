<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="知识管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1 sorter">
          <div class="sort"><span>ID</span><span class="relative" style="width: 12px;"><span class="absolute" style="display: block; top: -16px; transform: rotate(180deg);"><i class="iconfont icon-triangle"></i></span><span class="absolute" style="display: block; top: -6px;"><i class="iconfont icon-triangle"></i></span></span></div>
        </td>
        <td class="col-md-3">名称</td>
        <td class="col-md-2">知识分类</td>
        <td class="col-md-1">浏览</td>
        <td class="col-md-1">发布时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.id}}
        </td>
        <td>
          {{item.title}}
        </td>
        <td>{{item.name}}</td>
        <td>{{item.visit}}</td>
        <td>{{item.datetime}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
// import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    // Detail
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings['knowledge'].art;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

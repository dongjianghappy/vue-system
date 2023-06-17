<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="代码管理">
      <template v-slot:extraright>
        <Detail :coding="coding" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-5">名称</td>
        <td class="col-md-2">分类</td>
        <td class="col-md-1">浏览</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.title}}
        </td>
        <td>
          <div class="pointer">
            <v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding}" :isUpdate="true" type="text"></v-category>
          </div>
        </td>
        <td>{{item.visit}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>

              <Detail action="edit" :data="{id: item.id}" :coding="coding" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="init" :auth="auth" />
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
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings['code'];
    const checkedList: any = ref([])
    const pagesize: any = 10

    function init(param: any) {

const params: any = {
        page: 1,
        pagesize: pagesize
      }

      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding: coding.art,
          ...params
        }
      })
    }

    onMounted(() => {
      init({
        page: 1
      })
    })

    return {
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

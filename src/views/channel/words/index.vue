<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="内容管理">
      <template v-slot:extraright>
        <Detail :data="{coding}" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-4">内容</td>
        <td class="col-md-2">分类</td>
        <td class="col-md-2">发布时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" class="dragObj" :key="index" draggable="true" :index="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.content}}
        </td>
        <td>
          <div class="pointer">
            <v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding: coding.cate}" :isUpdate="true" :isMore="true" type="text"></v-category>
          </div>
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :render="init" :auth="auth.checked('edit')" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.art}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :pagination="{total: 10, page: 10, pagesize: 10}" :sorceData="dataList.list" :render="init" v-if="dataList.list && dataList.list.length > 0" :auth="auth" />
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
  useStore,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const coding: any = codings.words;
    const checkedList: any = ref([])
    const dataList: any = ref({})

    function init() {
      store.dispatch('common/Fetch', {
        api: "articleList",
        data: {
          coding: coding.art,
          page: 1,
          pagesize: 10
        }
      }).then((res: any) => {
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

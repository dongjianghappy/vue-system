<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="评论管理">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-2">用户</td>
        <td class="col-md-5">评论内容</td>
        <td class="col-md-2">评论时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          <v-avatar :data="item" />{{item.nickname}}
        </td>
        <td>
         {{item.summary}}
         <i class="iconfont icon-url cl-cad9e5"></i>
        </td>
        <td>
          {{item.times}}
        </td>
        <td><v-switch :data="{ item, field: 'checked', coding }" :auth="auth" /></td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete" :auth="auth.checked('del')" ></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList" :render="init" />
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
  channels
} from '@/utils'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'HomeViewdd',
  components: {

  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = channels().coding;
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        api: 'articleRelated',
        data: {
          coding: coding.art,
          name: 'comment',
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
      init,
      auth: proxy.$auth.init(`channel/${coding.name}/comment`)
    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="回答管理">
      <template v-slot:extraright>

      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-2">用户</td>
        <td class="col-md-6">问题答案</td>
        <td class="col-md-2">答复时间</td>
        <td class="col-md-1">状态</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          <v-avatar :data="item" />{{item.nickname}}
        </td>
        <td>
          <span  style="color: #40a9ff">【{{item.title}}】</span>{{item.content}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td><v-switch :data="{ item, field: 'checked', coding: 'T10000' }" :disabled="false" /></td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: 'T10000' }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="init" :auth="auth" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref
} from 'vue'
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
    const store = useStore();
    const dataList = computed(() => store.getters['channel/questions']['answerList']);
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])
    const pagesize: any = 10

    function init(param: any) {

      const sssss: any = {
        page: 1,
        pagesize: pagesize
      }

      Object.assign(sssss, param)
      store.dispatch('channel/answerListAction', {
        data: {
          ...sssss
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

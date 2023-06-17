<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="用户推送">
      <template v-slot:extraright>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-2">头像</td>
        <td class="col-md-7">用户名</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          <v-avatar :data="item" />
        </td>
        <td>
          {{item.nickname}}
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="取消推送" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'RecommendView',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'userRecommend'
      }).then(res => {
        dataList.value = res.result
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

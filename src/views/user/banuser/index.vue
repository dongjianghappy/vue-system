<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="违禁用户">
      <template v-slot:extraright>
        <v-condition name="类型" field="grade" :enums="[{value: '0', name: '禁言'},{value: '1', name: '封号'}]" :render="render" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-7">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">头像</td>
        <td class="col-md-2">用户名</td>
        <td class="col-md-1">违禁类型</td>
        <td class="col-md-1">违禁天数</td>
        <td class="col-md-4">违禁原因</td>
        <td class="col-md-1">违禁时间</td>
        <td class="col-md-1">解禁</td>
      </tr>

      <tr v-for="(item, index) in dataList.list" :key="index">
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
          {{bannedType[item.banuser_type]}}
        </td>
        <td>
          {{item.banuser_day}}
        </td>
        <td>
          {{item.banuser_reason}}
        </td>
        <td>
          {{item.banuser_time}}
        </td>
        <td>
          <v-confirm name="解禁" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
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
  useStore
} from '@/utils'
import {
  BANNED_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'BanuserView',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])
    const bannedType: any = BANNED_TYPE

    const dataList = computed(() => {
      return store.getters['user/banUser']
    });

    function init() {
      store.dispatch('user/banUserAction')
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init,
      bannedType
    }
  }
})
</script>

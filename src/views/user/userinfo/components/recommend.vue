<template>
<v-button v-model:show="isShow" :disabled="true">
  推送用户
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="推送用户" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
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
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  computed,
} from '@/utils'
import Detail from './detail.vue'
    const store = useStore()
    const isShow: any = ref(false)
    const dataList: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: 'userRecommend'
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

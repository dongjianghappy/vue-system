<template>
<v-button v-model:show="isShow" :disabled="true">
  表单配置
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="表单配置管理" :style="{width: '650'}" :hasfooter="false">
  <template v-slot:extra>
    <AddSetting action="add" :data="{coding}" :render="init" />
  </template>  
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, index) in dataList.list" :key="index">
          <span class="label">
            {{item.remark}}
            <AddSetting :data="{id: item.id, coding}" :render="init" action="edit" />
          </span>
          <!-- <v-switch :data="{ item, field: 'value', coding: data.coding.setting }" @toggle="getValue" className="right" :auth="true" /> -->
        </li>
      </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
    codings,
  defineProps,
  ref,
  useStore,
  watch,
} from '@/utils'

import AddSetting from './addSetting.vue'
  const props: any = defineProps({
  })
    const store = useStore()
    const coding = codings.user.schedule.config
    const isShow: any = ref(false)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
        init()
      }
    })

    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

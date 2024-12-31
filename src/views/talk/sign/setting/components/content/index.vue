<template>
<v-button v-model:show="isShow">
  签到文案
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="签到文案" :style="{width: 450}" :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <Detail action='add' :data="{coding}" :render="init" />
    </v-space>
  </template>
  <template v-slot:content v-if="isShow">
    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-10">内容</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :index="index">
        <td>
          {{item.content}}
        </td>
        <td>
          <v-space>
            <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
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
  watch,
  useStore,
  codings,
} from '@/utils'
import Detail from './components/detail.vue'
    const store = useStore();
    const coding = codings.sign_sentence
    const isShow: any = ref(false)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })
    
    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

<template>
<v-button v-model:show="isShow">
  鱼种类
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="鱼种类" :hasfooter="false">
  <template v-slot:extra>
    <Detail :data="{ coding }" :render="init" />
  </template>
  <template v-slot:content v-if="isShow">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">鱼名称</td>
        <td class="col-md-5">描述</td>
        <td class="col-md-2">能量</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.description}}
        </td>
        <td>
          {{item.energy}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete" :auth="true"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  codings
} from '@/utils'
import Detail from './detail.vue'

    const store: any = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const coding: any = codings.fish.kind;
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
</script>

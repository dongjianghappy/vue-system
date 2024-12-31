<template>
<v-button v-model:show="isShow" :disabled="true">
  分类设置
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="分类管理" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:extra>
    <Detail action='add' :data="{ coding }" :render="init" />
  </template>
  <template v-slot:content v-if="isShow">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">名称</td>
        <td class="col-md-7">说明</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.description}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />

        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="init" operating="delete" :auth="true"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  onMounted,
  useStore,
  watch,
  codings
} from '@/utils'
import Detail from './components/detail.vue'

    const store = useStore()
    const isShow: any = ref(false)
    const dataList: any = ref([])
    const coding: any = codings.talk.cate;

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
        init()
      }
    })

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)
      
      store.dispatch('common/Fetch', {
        data: {
          coding,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
    onMounted(init)
</script>

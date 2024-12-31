<template>
<v-button v-model:show="isShow" :disabled="true">
  <v-avatar :data="data" />{{data.nickname}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.nickname}的书签`" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:extra>
    <Group :data="{...data, coding: data.coding.cate}" name="Ta创建的组类" />
  </template>
  <template v-slot:content v-if="isShow">
    <div style="height: 461px">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-10">标题</td>
          <td class="col-md-1">状态</td>
          <td class="col-md-1">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>
          【{{item.parent}}】{{item.name}}
          <span class="ml10 cl-red">{{visibles[item.visible || 'public']}}</span>
          <span class="ml10" @click="visit(item)">查看</span>
          </td>
        <td><v-switch :data="{ item, field: 'checked', coding: data.coding.art }" :auth="true" /></td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: data.coding.art}" type="text" api="delete" :render="init" operating="delete"  ></v-confirm>
            </span>
          </v-space>
        </td>
        </tr>
      </table>
      <v-nodata :data="dataList" />
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
} from '@/utils'
import {
  visibles
} from '@/assets/const'
import Group from '../../group/detail.vue'

  const props: any = defineProps({
    name: {
      type: String,
      default: '评论'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
    const isShow: any = ref(false)
    const dataList: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = []
        init()
      }
    })

    function init() {
      store.dispatch('basic/Fetch', {
        api: 'bookmark',
        data: {
          uid: props.data.uid,
          page: 1,
          pagesize: 10
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
</script>

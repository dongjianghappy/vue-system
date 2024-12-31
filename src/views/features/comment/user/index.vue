<template>
<v-button v-model:show="isShow" :disabled="true">
  <v-avatar :data="data" />{{data.nickname}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.nickname}的评论`" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div style="height: 461px">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-3">评论对象</td>
          <td class="col-md-3">评论内容</td>
          <td class="col-md-2">评论时间</td>
          <td class="col-md-1">状态</td>
          <td class="col-md-3">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>
          <span v-if="item.title">{{item.title}}</span>
          <span v-html="item.summary" v-else></span>
          </td>
          <td>{{item.content}}</td>
          <td>
            {{item.times}}
          </td>
        <td><v-switch :data="{ item, field: 'checked', coding }" /></td>
        <td>
          <v-space>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"  ></v-confirm>
              <Praise :data="{...item, coding: data.coding}" />
              <Reply :data="{...item, coding: data.coding}" />            
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
import Praise from '../../praise/list.vue'
import Reply from '../reply/reply.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const store = useStore()
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
        api: 'articleRelated',
        data: {
          coding: props.data.coding,
          name: 'comment',
          from_uid: props.data.uid,
          page: 1,
          pagesize: 100
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

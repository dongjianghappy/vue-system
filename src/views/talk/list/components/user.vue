<template>
<v-button v-model:show="isShow" :disabled="true">
  <v-avatar :data="data" />{{data.nickname}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`${data.nickname}的微博`" :style="{width: 1200}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-6">内容</td>
        <td class="col-md-2">发布时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-3">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <span v-html="item.summary"></span>
          <span v-if="item.type === 'img'">
            <v-thumbnail :data="item" :coding="coding.art" icon="img" :hasInfo="false" />
          </span>
          <span v-if="item.type === 'video'">
            <v-thumbnail :data="item" :coding="coding.art" icon="video" type="Video" />
          </span>
        </td>
        <td>{{item.times}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space class="relative">
            <Comment :data="{...item, coding: coding.comment}" />
            <Praise :data="{...item, coding: coding.praise}" />
            <Collect :data="{...item, coding: coding.collect}" />
            <Detail action="edit" :data="{id: item.id, coding: coding.art}" :render="render" />
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
        <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: coding.art }" type="text" api="changeData" :render="render" operating="setTop"></v-confirm>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="render" />
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
  codings
} from '@/utils'

import Detail from './detail.vue'
import Praise from '../../../features/praise/list.vue'
import Comment from '../../../features/comment/components/list111.vue'
import Collect from '../../../features/collect/list.vue'
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
    const coding: any = codings.talk.art;
    const dataList: any = ref({})

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
        pagesize: 10
      }

      Object.assign(params, param)

      store.dispatch('talk/talkAction', {
        data: {
          uid: props.data.uid,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

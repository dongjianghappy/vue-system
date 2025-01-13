<template>
<v-button v-model:show="isShow" :disabled="true" style=" position: absolute; top: 0px; right: 0;">
  <i class="iconfont icon-shenhe font20 cl-5bc0de" />
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`待审核`" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">用户</td>
        <td class="col-md-5">内容</td>
        <td class="col-md-2">发布时间</td>
        <td class="col-md-3">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.nickname}}
        </td>

        <td>
          <span v-html="item.title || item.summary || item.content"></span>
          <span v-if="item.type === 'img'">
            <v-thumbnail :data="item" :coding="coding.art" icon="img" :hasInfo="false" />
          </span>
          <span v-if="item.type === 'video'">
            <v-thumbnail :data="item" :coding="coding.art" icon="video" type="Video" />
          </span>
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-space>
            <span>
              <Detail :data="{id: item.id, ...data }" name="详情" :render="init" />
            </span>
            <span>
              <v-confirm name="审核" :data="{id: item.id, management_checked: 1, ...data }" type="text" api="checkContent" :render="init" operating="check" :auth="true"></v-confirm>
            </span>
            <span>
              <ReturnDialog :data="{id: item.id, uid: item.uid, management_checked: -1, ...data }" :render="init" :auth="true" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
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
import Detail from './detail.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return
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

    // 初始化
    function init(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: 'checkedList',
        data: {
          coding: props.data.coding,
          management_checked: 0,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
        props.render()
      })
    }
</script>

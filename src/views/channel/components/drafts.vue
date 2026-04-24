<template>
<v-button v-model:show="isShow" :disabled="true">
  草稿箱
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="草稿箱" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div style="height: 461px">
      <table class="table-striped table-hover col-left-3">
        <tr class="th">
          <td class="col-md-2">用户</td>
          <td class="col-md-1">频道</td>
          <td class="col-md-7">标题</td>
          <td class="col-md-2">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td><v-avatar :data="item" />{{item.nickname}}</td>
          <td>
            {{item.type}}
          </td>
          <td>
            {{item.title}}
          </td>
          <td>
            <v-confirm name="删除" :data="{id: item.id, coding, operating: 'remove' }" type="text" api="delete" :render="init" operating="delete" :auth="true"></v-confirm>
          </td>
        </tr>
      </table>
      <v-nodata :data="dataList" />
      <div class="mt15 align_right">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
      </div>
    </div>
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


  const props: any = defineProps({
    name: {
      type: String,
      default: '点赞'
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
    const coding = codings.temporary_storage
    const dataList: any = ref([])

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
      store.dispatch('common/Fetch', {
        data: {
          coding,
          ...params
        }
      }).then(res => {
        res.result.list.map((item: any) => {
          if(item.content){
            let list = JSON.parse(item.content)
            item.title = list.title
          }
        })
        dataList.value = res.result
      })
    }
</script>

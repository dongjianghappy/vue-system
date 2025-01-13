<template>
<v-button v-model:show="isShow" :disabled="true">
  微博用户
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="微博用户" :style="{width: '800'}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
      <table class="table-striped table-hover col-left-1">
        <tr class="th">
          <td class="col-md-4">用户</td>
          <td class="col-md-6">会员账号</td>
          <td class="col-md-2">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
        <td style="display: flex">
          <v-avatar :data="item" />
          <div class="pl5" style="flex: 1; height: 32px; line-height: 32px; display: inline-block;">
            {{item.nickname}}
          </div>
        </td>
        <td>
          {{item.account}}
        </td>
        <td>
          <span>
            <Detail action="edit" :data="{uid: item.account, coding: data.coding }" :render="init" />
          </span>
        </td>
        </tr>
      </table>
      <v-nodata :data="dataList" />
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
  computed,
} from '@/utils'
import Detail from './detail.vue'
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
    const dataList: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init(param: any = {}) {
      store.dispatch('user/userListAction', {
        data: {
          coding: props.data.coding.role,
          weibo: 1,
          page: 1,
          pagesize: 100
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }
</script>

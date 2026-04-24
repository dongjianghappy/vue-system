<template>
<v-button v-model:show="isShow" :disabled="true">
  标签
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="`标签管理`" :style="{width: '450'}" :hasfooter="false">
  <template v-slot:extra>
    <span @click="handleClick">标签入库</span>
  </template>
  <template v-slot:content v-if="isShow">
    <div style="height: 461px">
      <table class="table-striped table-hover">
        <tr class="th">
          <td class="col-md-2">ID</td>
          <td class="col-md-7">标签</td>
          <td class="col-md-3">更新时间</td>
        </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>
            {{item.id}}
          </td>
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.update_time}}
          </td>
        </tr>
      </table>
      <v-nodata :data="dataList" />
      <div class="mt25 align_center" v-if="dataList.total > 100">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
      </div>
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
    codings,
  defineProps,
  ref,
  useStore,
  watch,
} from '@/utils'


  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const {ctx, proxy}:any = getCurrentInstance();
    const coding: any = codings.tag
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

    function handleClick(){
      store.dispatch('common/Fetch', {
        api: 'insertTag',
        data: {
          coding: props.data.channel.coding.art,
          channel_id: props.data.channel.id
        }
      }).then(res => {
        proxy.$hlj.message("添加成功")
      })
    }

    function init(param: any) {

      const params: any = {
        page: 1,
        pagesize: 100
      }

      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        data: {
          coding,
          channel_id: props.data.channel.id,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
</script>

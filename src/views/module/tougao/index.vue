<template>
  <div class="module-wrap">
    <div class="module-head">
      <v-optionsbar title="内容管理">
      </v-optionsbar>
    </div>
    <div class="module-content plr15">
      <table class="table-striped table-hover col-left-35">
        <tr class="th">
          <td class="col-md-1">用户</td>
          <td class="col-md-3">标题</td>
          <td class="col-md-1">类型</td>
          <td class="col-md-3">描述</td>
          <td class="col-md-1">附件</td>
          <td class="col-md-1">联系方式</td>
          <td class="col-md-1">状态</td>
          <td class="col-md-1">操作</td>
        </tr>
        <tr v-for="(item, index) in dataList.list"
            :key="index">
          <td>
            {{item.uid}}
          </td>
          <td>
            {{item.title}}
          </td>
          <td>
            {{item.type}}
          </td>
          <td>{{item.description}}</td>
          <td>{{item.file}}</td>
          <td>{{item.contact}}</td>
          <td>
            <v-switch :data="{ item, field: 'checked', coding: coding.art }"
                      :auth="true" />
          </td>
          <td>
            <span>
              <v-confirm name="删除"
                         :data="{id: item.id, coding}"
                         api="delete"
                         :render="init"
                         operating="delete"></v-confirm>
            </span>
          </td>
        </tr>
      </table>
      <v-nodata :data="dataList.list || []" />
      <div class="mt15 align_right">
        <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}"
                      :render="init" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'HomeViewdd',
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings.module['tougao'];
    const checkedList: any = ref([])
    const pagesize: any = 10

    function init(param: any) {

const params: any = {
        page: 1,
        pagesize: pagesize
      }

      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding: coding.art,
          ...params
        }
      })
    }

    onMounted(() => {
      init({
        page: 1
      })
    })

    return {
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

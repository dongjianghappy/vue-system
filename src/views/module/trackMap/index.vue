<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="轨道图管理">
      <template v-slot:extraright>
        <Detail :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-8">名称</td>
        <td class="col-md-2">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.name}}
        </td>
        <td><v-switch :data="{ item, field: 'status', coding }" :auth="true" /></td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <Content action="edit" :data="{id: item.id}" :coding="coding" :param="param" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
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
import Detail from './components/detail.vue'
import Content from './components/content.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Content
  },
  setup(props, context) {
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = codings.track;
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

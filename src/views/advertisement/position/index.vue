<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="广告位置">
      <template v-slot:extraright>
        <v-condition name="网站" icon="select" field="website" :enums="siteEnum" :render="init" />
        <Detail action='add' :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table class="table-striped table-hover col-left-1">
      <tr>
        <td class="col-md-2">广告位名称 </td>
        <td class="col-md-1">页面id标签</td>
        <td class="col-md-1">站点</td>
        <td class="col-md-4">页面位置</td>
        <td class="col-md-1">绑定广告</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.label}}
        </td>
        <td>
          {{item.site_name}}
        </td>
        <td class="align_left">
          {{item.explain}}
        </td>
        <td>
          <span class="cl-green" v-if="item.ad_id !== '0'">已绑定</span>
          <span class="cl-999" v-else>未绑定</span>
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, website: item.website, coding }" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList || []" />
    <div class="mt15 align_right">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  codings,
  onMounted
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  props: {
    data: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const coding: any = codings;
    const dataList: any = ref([])
    const siteEnum: any = ref([])

    // 初始化
    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 100
      }

      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: "advertisementPosition",
        data: {
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function getSite() {
      // 获取站点信息
      store.dispatch('basic/Fetch', {
        state: 'announcement',
        data: {
          coding: coding.site,
          page: 1,
          pagesize: 10,
          status: '1'
        }
      }).then(res => {
        res.result.list.map((item: any) => {
          siteEnum.value.push({
            value: item.id,
            name: item.name
          })
        })
      })
    }

    onMounted(() => {
      init()
      getSite()
    })

    return {
      coding: coding.advertisement_position,
      init,
      dataList,
      siteEnum,
    }
  }
})
</script>

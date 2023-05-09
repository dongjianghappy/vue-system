<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="广告管理">
      <template v-slot:extraright>
        <span class="mr10" @click="handleCreateJson">生产JSON</span>
        <v-condition name="站点" icon="select" field="website" :enums="siteEnum" :render="init" />
        <Detail action='add' :data="{coding}" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content p15">
    <table width="100%" class="table-striped table-hover col-left-2">
      <tr>
        <td class="col-md-1">选择</td>
        <td class="col-md-2">广告名称</td>
        <td class="col-md-1">尺寸类型</td>
        <td class="col-md-1">站点</td>
        <td class="col-md-3">广告页面位置</td>
        <td class="col-md-1">每月/元</td>
        <!-- <td class="col-md-1">时间</td> -->
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
        </td>
        <td>{{item.width}} X {{item.height}}</td>
        <td>{{item.site_name}}
          
        </td>
        <td class="align_left">
          <div v-for="(list, index) in item.list" :key="index">{{list.name}}<span class="ml5 cl-999">【{{list.page}}】</span></div>
        </td>
        <td>{{item.price}}</td>
        <!-- <td>{{item.start_time}}</td> -->
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />
        </td>
        <td>
          <v-space class="relative">
            <span>
              <Detail action="edit" :data="{id: item.id, website: item.website, coding }" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
            <!-- <span>生成订单</span> -->
            <v-popover content="更多" arrow="tb" offset="right" :move="-350" :keys="`static_${index}`">
              <div class="font14" style="width: 400px;">
                <table width="100%" class="table-striped table-hover">
                  <tr>
                    <td class="col-md-1">服务器</td>
                    <td class="col-md-1">平台</td>
                    <td class="col-md-1">出售次数</td>
                    <td class="col-md-1">点击次数</td>
                  </tr>
                  <tr>
                    <td>{{item.website}}</td>
                    <td>{{item.source}}</td>
                    <td>{{item.visit}}</td>
                  </tr>
                </table>
              </div>
            </v-popover>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList || []" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList" :render="init" v-if="dataList && dataList.length > 0" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch,
  ref,
  useRoute,
  useStore,
  codings
} from '@/utils'
import {
  SERVER_NAME
} from '@/assets/enum'
import Detail from './components/detail.vue'
import List from './components/list.vue'
import List2 from './components/list2.vue'
import List3 from './components/list3.vue'
import List4 from './components/list4.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
    List3,
    List4,
    Detail,
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['advertisement'];
    const serverName: any = SERVER_NAME
    const siteList: any = ref([])
    const siteEnum: any = ref([])
    let menu: any = ref([{
        name: "广告管理",
        value: "advertisement1"
      },
      {
        name: "广告位置",
        value: "advertisement1"
      },
      {
        name: "广告申请",
        value: "advertisement2"
      },
      {
        name: "订单列表",
        value: "advertisement3"
      }
    ])
    const dataList: any = ref({})

    // 初始化
    function init(param: any) {

      const params: any = {
        page: 1,
        pagesize: 30
      }
      Object.assign(params, param)

      store.dispatch('basic/Fetch', {
        api: "advertisement",
        data: {
          ...params
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    function handleCreateJson(){
      store.dispatch('common/Fetch', {
        api: "createAdJson",
      }).then((res: any) => {
        
      })
      
    }

       function getSite() {
      // 获取站点信息
      store.dispatch('basic/Fetch', {
        state: 'announcement',
        data: {
          coding: "Q0018",
          page: 1,
          pagesize: 10,
          status: '1'
        }
      }).then(res => {
        siteList.value = res.result.list
        res.result.list.map((item: any) => {
          siteEnum.value.push({
            value: item.id,
            name: item.name
          })
        })
      })
    }

    onMounted(() => {
      init({
        page: 1,
        pagesize: 100
      })
      getSite()
    })

    return {
      coding,
      menu,
      init,
      dataList,
      serverName,
      handleCreateJson,
      siteList,
      siteEnum,
    }
  }
})
</script>

<template>
<table class="table-striped table-hover col-left-23">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-4">名称</td>
    <td class="col-md-2">分类</td>
    <td class="col-md-2">发布时间</td>
    <td class="col-md-1">状态</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr class="tr-list" v-for="(item, index) in dataList.list" :key="index">
    <td>
      <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
    </td>
    <td>
      <span @click="showImg(item)">{{item.title}}</span>
      <span v-if="item.summary !== ''">
        <i class="infos demoimg iconfont icon-article"></i>
      </span>
      <!-- <span class="relative" v-if="item.image.length">
        <v-popover content="<i class='iconfont icon-img'></i>" arrow="lr" offset="right" :move="-70" :keys="`popover-img$-${index}`" type="hover">
          <div class="p10 w250">
            <img :src="item.cover" style="width: 100%" />
          </div>
        </v-popover>
      </span> -->
      <span class="relative" v-if="item.flags.length > 0">
        <v-popover content="<i class='iconfont icon-tags'></i>" arrow="tb" offset="right" :move="0" :keys="`popover-img$-${index}`" type="hover">
          <div class="w250">
            <span class="mr10" v-for="(data, i) in data.aaa" :key="i"><i class="iconfont" :class="`icon-${data.icon}`" v-if="item.flags.indexOf(data.tag) > -1" />{{item.flags.indexOf(data.tag) > -1 ? data.value : "" }}</span>
          </div>
        </v-popover>
      </span>
    </td>
    <td>
      <div class="pointer">
        <v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding: data.coding}" :isUpdate="true" :isMore="true" type="text"></v-category>
      </div>
    </td>
    <td>{{item.times}}</td>
    <td>
      <v-switch :data="{ item, field: 'checked', coding: data.coding.art }" :disabled="auth.checked('edit')" />
    </td>
    <td>
      <v-space class="relative">
        <SourceDetail action="edit" :data="{id: item.id}" :coding="data.coding" :param="param" :render="render" :auth="auth.checked('edit')" v-if="data.module === 'source'" />
        <DesignDetail action="edit" :data="{id: item.id}" :coding="data.coding" :param="param" :render="render" :auth="auth.checked('edit')" v-else-if="data.module === 'design'" />
        <OfficeDetail action="edit" :data="{id: item.id}" :coding="data.coding" :param="param" :render="render" :auth="auth.checked('edit')" v-else-if="data.module === 'office'" />
        <WordsDetail action="edit" :data="{id: item.id}" :coding="data.coding" :param="param" :render="render" :auth="auth.checked('edit')" v-else-if="data.module === 'words'" />
        <FunnyDetail action="edit" :data="{id: item.id}" :coding="data.coding" :param="param" :render="render" :auth="auth.checked('edit')" v-else-if="data.module === 'funny'" />
        <v-button @click="handleClick(item)" :disabled="auth.checked('edit')" v-else >
          编辑
        </v-button>
        
        <span>
          <v-confirm name="删除" :data="{id: item.id, coding: data.coding.art, operating: 'remove' }" type="text" api="removeAndRestore" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
        </span>
        <v-popover content="更多" arrow="tb" offset="right" :move="-650" :keys="`static_${index}`">
          <div class="p15 font14" style="width: 700px;">
            <table class="table-striped table-hover">
              <tr>
                <td class="col-md-1">ID</td>
                <td class="col-md-3">编号</td>
                <td class="col-md-1">浏览</td>
                <td class="col-md-1">评论</td>
                <td class="col-md-1">点赞</td>
                <td class="col-md-1">收藏</td>
                <td class="col-md-1">下载</td>
                <td class="col-md-1">发布者</td>
                <td class="col-md-2">操作</td>
              </tr>
              <tr>
                <td>{{item.id}}</td>
                <td>{{item.number}}</td>
                <td>{{item.visit}}</td>
                <td>{{item.comment}}</td>
                <td>{{item.praise}}</td>
                <td>{{item.collect}}</td>
                <td>{{item.download}}</td>
                <td>{{item.nickname}}</td>
                <td>
                  <v-space>
                    <a :href="`http://www.${data.server}/${data.module}/${item.id}.html`" target="_blank">预览</a>
                    <span @click="handleUpdate(item)">生成静态</span>
                  </v-space>
                </td>
              </tr>
            </table>
            
            <div class="p10" style="background: rgb(250, 250, 250);">
              <p class="mb5"><span @click="handleView(item)" class="pointer"><i class="iconfont icon-chart" /></span></p>
              <p class="mb5">颜色: 
                <span v-for="(color, i) in item.color" :key="i" class="mr15">
        <i class="block" :class="`bg-${color}`" style=" display: inline-block; border-radius: 2px; width: 12px; height: 12px;"></i>
      </span>
              </p>
              <p class="mb5">聚合标签:
                <v-checkboxgroup :tagList="data.aaa" :checked="item.flags" />
              </p>
              <p>标签: {{item.tag}}</p>
            </div>
          </div>
        </v-popover>
        <span>
          <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: data.coding.art }" type="text" api="changeData" :render="render" operating="setTop" :auth="auth.checked('top')"></v-confirm>
        </span>
      </v-space>
    </td>
  </tr>
</table>
<!-- <v-loading :loading="loading" :dataList="dataList.list || []" /> -->
<v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" :auth="auth" />
<v-articlepreview v-model:isShow="showFlag" :data="{...currentData, coding: data.coding.art}" :render="render" :img="currentImg" v-if="showFlag" type="album" />
<Graph v-model:show="showGraph" :data="{coding: data.coding.art, detailApi: 'detail', updateApi: 'updateRobot', ...showGraph.data}" v-if="showGraph.view" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute,
  useRouter,
  ref,
  computed,
  jsonParse
} from '@/utils'
import Graph from '../../../robot/graph/index.vue'
import SourceDetail from '../../source/components/detail.vue'
import DesignDetail from '../../design/components/detail.vue'
import OfficeDetail from '../../office/components/detail.vue'
import WordsDetail from '../../words/components/detail.vue'
import FunnyDetail from '../../funny/components/detail.vue'

export default defineComponent({
  name: 'v-Search',
  components: {
    Graph,
    SourceDetail,
    DesignDetail,
    OfficeDetail,
    WordsDetail,
    FunnyDetail
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isPersonal: {
      type: Boolean,
      default: false
    },
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  emits: ['update:graph'],
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const checkedList: any = ref([])
    const showFlag: any = ref(false)
    const currentData: any = ref({})
    const showGraph: any = ref({
      view: false,
      data: {}
    })
    const dataList = computed(() => {
      return store.getters[`channel/${props.data.module}`]['articleList']
    });

    function handleClick(params: any) {
      if (!props.auth.checked('edit')) {
        return
      }
      router.push(`/admin/${props.data.module}/list/edit?id=${params.id}`)
    }

    function handleUpdate(param: any) {
      // proxy.$loading.loading()
      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          serve: props.data.server,
          id: param.id,
          action: 'singleArticle',
          model: props.data.module
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "跟新成功"
        })
      })
    }

    function showImg(param: any) {
      currentData.value = param
      showFlag.value = !showFlag.value
    }

    function handleView(param: any) {
     
      showGraph.value =  {
        view: true,
        data: param
      }
    }

    return {
      handleClick,
      checkedList,
      jsonParse,
      dataList,
      handleUpdate,
      currentData,
      showImg,
      showFlag,
      showGraph,
      handleView
    }
  }
})
</script>

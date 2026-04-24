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
      <span class="cl-5bc0de" v-if="item.method=='1'">转</span>
      <span class="cl-eb7350" v-else-if="item.method=='2'">原</span>
      <span class="cl-green" v-else-if="item.method=='3'">搞</span>
      <span class="cl-red" v-else>Ai</span>
      <i class="iconfont icon-dot" />
      <span >{{item.title}}</span>
      <span>
        <i class="infos demoimg iconfont icon-write" :class="{'cl-red': item.summary == ''}"></i>
      </span>
      <span>
        <i class="infos demoimg iconfont icon-content" :class="{'cl-red': item.content == ''}"></i>
      </span>
      <span v-if="item.image.length">
        <v-thumbnail :data="item" :coding="data.coding.art" icon="pic" :hasInfo="false" />
      </span>
      <span class="relative" v-if="item.draw_image">
        <v-popover content="<i class='iconfont icon-img'></i>" arrow="tb" offset="right" :move="0" :keys="`popover-img$-${index}`" type="hover">
          <div class="w250">
            <img :src="item.draw_image" width="320" />
          </div>
        </v-popover>
      </span>
      <!-- <span class="relative" v-if="item.flags.length > 0">
        <v-popover content="<i class='iconfont icon-tags'></i>" arrow="tb" offset="right" :move="0" :keys="`popover-img$-${index}`" type="hover">
          <div class="w250">
            <span class="mr10" v-for="(data, i) in data.aaa" :key="i"><i class="iconfont" :class="`icon-${data.icon}`" v-if="item.flags.indexOf(data.tag) > -1" />{{item.flags.indexOf(data.tag) > -1 ? data.value : "" }}</span>
          </div>
        </v-popover>
      </span> -->
      <span class="cl-5bc0de" v-if="item.sync.indexOf('weixin') > -1">
        <i class="iconfont icon-qr cl-green" />
        U:{{item.login_view}} - C:{{item.code_view}}
      </span>
    </td>
    <td>
      <v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding: data.coding}" :isUpdate="true" :isMore="true" type="text" class="pointer"></v-category>
    </td>
    <td>{{item.times}}</td>
    <td>
      <v-switch :data="{ item, field: 'checked', coding: data.coding.art }" :disabled="false" />
    </td>
    <td>
      <v-space class="relative">
        <ArticleDetail action="edit" :data="{channel: data.channel, id: item.id, coding: data.coding}" :render="render" :auth="auth.checked('edit')" v-if="data.channel.module === 'article' || data.channel.module === 'tech' || data.channel.module === 'topic'" />
        <SourceDetail action="edit" :data="{channel: data.channel, id: item.id, coding: data.coding}" :render="render" :auth="auth.checked('edit')" v-else-if="data.channel.module === 'source'" />
        <DesignDetail action="edit" :data="{channel: data.channel, id: item.id, coding: data.coding}" :render="render" :auth="auth.checked('edit')" v-else-if="data.channel.module === 'design'" />
        <OfficeDetail action="edit" :data="{channel: data.channel, id: item.id, coding: data.coding}" :render="render" :auth="auth.checked('edit')" v-else-if="data.channel.module === 'office'" />
        <WordsDetail action="edit" :data="{channel: data.channel, id: item.id, coding: data.coding}" :render="render" :auth="auth.checked('edit')" v-else-if="data.channel.module === 'words'" />
        <FunnyDetail action="edit" :data="{channel: data.channel, id: item.id, coding: data.coding}" :render="render" :auth="auth.checked('edit')" v-else-if="data.channel.module === 'funny'" />
        <NotesDetail action="edit" :data="{channel: data.channel, id: item.id, coding: data.coding}" :render="render" :auth="auth.checked('edit')" v-else-if="data.channel.module === 'notes'" />
        <DocumentDetail action="edit" :data="{channel: data.channel, id: item.id, coding: data.coding}" :render="render" :auth="auth.checked('edit')" v-else-if="data.channel.module === 'document'" />
        <v-confirm name="删除" :data="{id: item.id, coding: data.coding.art, operating: 'remove' }" type="text" api="removeAndRestore" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
        <Preview :data="{id: item.id, ...data }" name="详情" :render="render" />
        <v-popover content="更多" arrow="tb" offset="right" :move="-650" :keys="`static_${index}`">
          <div class="p15 font14" style="width: 700px;">
            <table class="table-striped table-hover">
              <tr>
                <td class="col-md-1">ID</td>
                <td class="col-md-2">编号</td>
                <td class="col-md-1">浏览</td>
                <!-- <td class="col-md-1">评论</td>
                <td class="col-md-1">点赞</td>
                <td class="col-md-1">收藏</td> -->
                <!-- <td class="col-md-1">下载</td> -->
                <td class="col-md-2">发布者</td>
                <td class="col-md-5">操作</td>
              </tr>
              <tr>
                <td>{{item.id}}</td>
                <td>{{item.number}}</td>
                <td>{{item.visit}}</td>
                <!-- <td></td>
                <td></td>
                <td></td> -->
                <!-- <td></td> -->
                <td>{{item.nickname}}</td>
                <td>
                  <v-space>
                    <Comment :data="{...item, coding: data.coding.comment}" />
                    <Praise :data="{...item, coding: data.coding.praise}" />
                    <Collect :data="{...item, coding: data.coding.collect}" />
                    <Download :data="{...item, coding: data.coding.collect}" />
                    <!-- <a :href="`http://www.${data.server}/${data.channel.module}/${item.id}.html`" target="_blank">预览</a>
                    <span @click="handleUpdate(item)">生成静态</span> -->
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
<v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" :auth="auth" />
<Graph v-model:show="showGraph" :data="{coding: data.coding.art, detailApi: 'detail', updateApi: 'updateRobot', ...showGraph.data}" v-if="showGraph.view" />
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  useStore,
  useRoute,
  useRouter,
  ref,
  computed
} from '@/utils'
import Graph from '../../../robot/graph/index.vue'
import Preview from '../../../data/components/detail.vue'
import ArticleDetail from '../../detail/articleDetail.vue'
import SourceDetail from '../../detail/sourceDetail.vue'
import DesignDetail from '../../design/components/detail.vue'
import OfficeDetail from '../../office/components/detail.vue'
import WordsDetail from '../../words/components/detail.vue'
import FunnyDetail from '../../detail/funnyDetail.vue'
import NotesDetail from '../../detail/notesDetail.vue'
import DocumentDetail from '../../detail/documentDetail.vue'
import Praise from '../../../features/praise/list.vue'
import Comment from '../../../features/comment/components/list111.vue'
import Collect from '../../../features/collect/list.vue'
import Download from '../../../features/download/list.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  })
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const checkedList: any = ref([])
    const currentData: any = ref({})
    const showGraph: any = ref({
      view: false,
      data: {}
    })
    const dataList = computed(() => {
      return store.getters[`channel/${props.data.channel.module}`]['articleList']
    });

    function handleClick(params: any) {
      if (!props.auth.checked('edit')) {
        return
      }
      router.push(`/admin/${props.data.channel.module}/list/edit?id=${params.id}`)
    }

    function handleUpdate(param: any) {
      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          serve: props.data.server,
          id: param.id,
          action: 'singleArticle',
          model: props.data.channel.module
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "更新成功"
        })
      })
    }

    function handleView(param: any) {
      showGraph.value =  {
        view: true,
        data: param
      }
    }
</script>

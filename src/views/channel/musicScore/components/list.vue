<template>
<table width="100%" class="table-striped table-hover col-left-3">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-1">ID</td>
    <td class="col-md-3">名称</td>
    <td class="col-md-2">分类</td>
    <td class="col-md-2">发布时间</td>
    <td class="col-md-1">状态</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr class="tr-list" v-for="(item, index) in dataList" :key="index">
    <td>
      <div><label class="ant-checkbox-wrapper"><span class="ant-checkbox"><input type="checkbox" class="ant-checkbox-input" value=""><span class="ant-checkbox-inner"></span></span></label></div>
    </td>
    <td>{{item.id}}</td>
    <td>{{item.title}}<i class="iconfont icon-img"></i><i class="iconfont icon-article"></i></td>
    <td>
      <div class="pointer">{{item.parent}}</div>
    </td>
    <td>{{item.times}}</td>
    <td>
      <v-switch :data="{ item, field: 'status', coding: 'P0003' }" />
    </td>
    <td>
      <v-space class="relative">
        <span @click="handleClick(item)" class="pointer" v-if="!isPersonal">编辑</span>
        <span>
          <v-confirm name="删除" :data="{id: item.id, coding: 'P0003' }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
        </span>
        <span>
          <v-confirm name="置顶" :data="{id: item.id, coding: 'P0003' }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
        </span>
        <Popover content="更多" arrow="tb" offset="right" :move="-500" :keys="`static_${index}`">
          <div class="font14">
            <table width="100%" class="table-striped table-hover">
              <tr>
                <td class="col-md-1">浏览</td>
                <td class="col-md-1">评论</td>
                <td class="col-md-1">点赞</td>
                <td class="col-md-1">收藏</td>
                <td class="col-md-1">下载</td>
              </tr>
              <tr>
                <td>{{item.visit}}</td>
                <td>{{item.comment}}</td>
                <td>{{item.praise}}</td>
                <td>{{item.collect}}</td>
                <td>{{item.download}}</td>
              </tr>
            </table>
            <div style="background: rgb(250, 250, 250); padding: 12px; width: 500px;">
              <p>聚合标签:
                <v-checkboxgroup :tagList="data.aaa" :checked="item.checkboxList" />
              </p>
              <p class="mb5">标签: {{item.tag}}</p>
            </div>
          </div>
        </Popover>
      </v-space>
    </td>
  </tr>
</table>
<v-nodata :data="dataList || []" />
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute,
  useRouter,
  ref
} from '@/utils'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Search',
  components: {
    Popover
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
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();

    function handleClick(params: any) {
      router.push(`/admin/${props.data.module}/list/detail?id=${params.id}`)
    }

    return {
      handleClick,
    }
  }
})
</script>

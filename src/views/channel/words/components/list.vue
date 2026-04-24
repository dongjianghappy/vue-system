<template>
  <table class="table-striped table-hover col-left-23">
    <tr class="th">
      <td class="col-md-1">选择</td>
      <td class="col-md-4">内容</td>
      <td class="col-md-2">分类</td>
      <td class="col-md-2">发布时间</td>
      <td class="col-md-1">状态</td>
      <td class="col-md-2">操作</td>
    </tr>
    <tr v-for="(item, index) in dataList.list" class="dragObj" :key="index" draggable="true" :index="index">
      <td>
        <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
      </td>
      <td>
        {{item.title}}
      </td>
      <td>
        <div class="pointer">
          <v-category title="选择分类" :name="item.parent ? item.parent : '选择分类'" :data="{item, coding: coding.cate}" :isUpdate="true" :isMore="true" type="text"></v-category>
        </div>
      </td>
      <td>{{item.times}}</td>
      <td>
        <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="auth.checked('edit')" />
      </td>
      <td>
        <v-space>
          <span>
            <Detail action="edit" :data="{channel: channelData, id: item.id, coding}" :render="init" :auth="auth.checked('edit')" />
          </span>
          <span>
            <v-confirm name="删除" :data="{id: item.id, coding: coding.art}" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
          </span>
        </v-space>
      </td>
    </tr>
  </table>
  <v-nodata :data="dataList.list" />
  <v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :sorceData="dataList" :render="render" :auth="auth" />
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  useStore,
  useRoute,
  useRouter,
  ref,
  computed,
  channels
} from '@/utils'
import Detail from '../../../channel/detail/WordsDetail.vue'
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
  const channelData: any = channels();
  const coding: any = channels().coding;
  const checkedList: any = ref([])
  const currentData: any = ref({})
  const showGraph: any = ref({
    view: false,
    data: {}
  })
  const dataList = computed(() => {
    return store.getters[`channel/${props.data.channel.module}`]['articleList']
  });

</script>

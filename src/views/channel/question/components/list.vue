<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-3">问题</td>
    <td class="col-md-2">分类</td>
    <td class="col-md-2">提问时间</td>
    <td class="col-md-1">状态</td>
    <td class="col-md-3">操作</td>
  </tr>
  <tr class="tr-list" v-for="(item, index) in dataList.list" :key="index">
    <td>
      <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
    </td>
    <td>
      <span :style="jsonParse(item.style)">{{item.title}}</span>
      <span v-if="item.second_title">•{{item.second_title}}</span>
    </td>
    <td>
      <div class="pointer">
        {{item.province_name}}({{item.parent}})
      </div>
    </td>
    <td>{{item.times}}</td>
    <td>
      <v-switch :data="{ item, field: 'checked', coding: data.coding.art }" :disabled="auth.checked('edit')" />
    </td>
    <td>
      <v-space class="relative">
        <Answer :data="item" />
        <span>
          <Detail action="edit" :data="{id: item.id, coding: data.coding }" :render="render" :auth="auth.checked('edit')" />
        </span>
        <span>
          <v-confirm name="删除" :data="{id: item.id, coding: data.coding.art, operating: 'remove' }" type="text" api="removeAndRestore" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
        </span>
        <span>
          <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: data.coding.art }" type="text" api="changeData" :render="render" operating="setTop" :auth="auth.checked('top')"></v-confirm>
        </span>
      </v-space>
    </td>
  </tr>
</table>
<v-nodata :data="dataList.list || []" />
<v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.pages, page: dataList.page ||  1, pagesize: 25}" :sorceData="dataList" :render="render" :auth="auth" />
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
  jsonParse
} from '@/utils'
import Detail from '../../detail/qustionsDetail.vue'
import Answer from '../answer/answer.vue'
  const props: any = defineProps({
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
</script>

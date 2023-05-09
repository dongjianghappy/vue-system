<template>
<table width="100%" class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">选择</td>
    <td class="col-md-2">名称</td>
    <td class="col-md-2">地区/类型</td>
    <td class="col-md-2">联系方式</td>
    <td class="col-md-2">申请时间</td>
    <td class="col-md-1">状态</td>
    <td class="col-md-2">操作</td>
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
    <td>{{item.contact}}</td>
    <td>{{item.times}}</td>
    <td>
      <v-switch :data="{ item, field: 'checked', coding: data.coding.art }" :disabled="auth.checked('edit')" />
    </td>
    <td>
      <v-space class="relative">
        <span>
              <Detail action="edit" :data="{id: item.id, ...data.coding }" :render="render" :auth="auth.checked('edit')" />
            </span>
        <span>
          <v-confirm name="删除" :data="{id: item.id, coding: data.coding.art, operating: 'remove' }" type="text" api="removeAndRestore" :render="render" operating="delete" :auth="auth.checked('del')"></v-confirm>
        </span>
        <v-popover content="更多" arrow="tb" offset="right" :move="-950" :keys="`static_${index}`">
          <div class="font14" style="width: 1000px;">
            <table width="100%" class="table-striped table-hover">
              <tr>
                <td class="col-md-1">ID</td>
                <td class="col-md-1">浏览</td>
                <td class="col-md-4">网站地址</td>
                <td class="col-md-3">第二个地址</td>
                <td class="col-md-1">发布者</td>
                <td class="col-md-2">操作</td>
              </tr>
              <tr>
                <td>{{item.id}}</td>
                <td>{{item.visit}}</td>
                <td>{{item.url}}</td>
                <td>{{item.second_url}}</td>
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
<v-nodata :data="dataList.list || []" />
<v-buttongroup :checkedList="checkedList" :disabled="false" :data="{id: checkedList, coding: data.coding.art }" :pagination="{total: dataList.pages, page: dataList.page ||  1, pagesize: 25}" :sorceData="dataList" :render="render" :auth="auth" />
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
import {
  PRIOVINCE
} from '@/assets/const'
import Detail from './detail.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Detail
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
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const checkedList: any = ref([])
    const provinceType: any = PRIOVINCE

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

    return {
      handleClick,
      checkedList,
      jsonParse,
      dataList,
      handleUpdate,
      provinceType
    }
  }
})
</script>

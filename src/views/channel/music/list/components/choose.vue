<template>
  <div class="label">
    <span @click="handleChoose" class="pointer">
  请选择内容
</span>
  </div>
  <div class="cl-999">
  <div v-for="(item, index) in articleList" :key="index" class="mb10">{{item.title}} <i class="iconfont icon-close font12" @click="handleDelete(index)"></i></div>
  </div>
<v-drawer ref="drawer" v-model:show="isShow" action="add" title="请选择" :style="{width: 450}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 选择</td>
        <td class="col-md-2">标题 </td>
      </tr>
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>
            
            <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" @onClick="handleChange" />
          </td>
          <td>
            {{item.title}}
          </td>
        </tr>
    </table>
    <div class="mt25 align_center">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  onMounted,
  watch,
  codings
} from '@/utils'
export default defineComponent({
  name: 'v-ChooseSite',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    articleList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "checkbox"
    },
    message: {
      type: String,
      default: ""
    },
    module: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  emits: ['getArticle'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const dataList: any = ref([])
    const coding: any = codings
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        checkedList.value = []
        init({
          page: 1
        })
      }
    })

    //初始页面
    function init(param: any) {
      const cateCoding = coding[props.module].art

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: "articleList",
        data: {
          coding: cateCoding,
          management_checked: "1",
          ...params
        }
      }).then(res => {
        dataList.value = res.result
        res.result.list.map((item: any) => {
          let arr = props.articleList.filter((data: any)=>data.id === item.id)
          if(arr.length > 0){
          if(checkedList.value.indexOf(arr[0].id) === -1){
            checkedList.value.push(arr[0].id)
          }
        }
        })
      })
    }

    function handleChoose() {
      if (props.disabled) {
        proxy.$hlj.message({
          msg: props.message
        })
        return false
      }
      isShow.value = true
    }

    function handleChange(param: any) {
      let arr = dataList.value.list.filter((item: any) => item.id === param.id)
        context.emit("getArticle", arr[0])
    }

    function handleDelete(index: any){
      props.articleList.splice(index, 1)
    }

    return {
      isShow,
      drawer,
      handleChoose,
      handleChange,
      handleDelete,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

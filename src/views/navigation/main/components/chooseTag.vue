<template>
  <div class="label">
    <span @click="handleChoose" class="pointer">
  请选择标签
</span>
  </div>
  <div class="cl-999">
  <span v-for="(item, index) in tagList" :key="index" class="mr10">{{item.name}} <i class="iconfont icon-close font12" @click="handleDelete(index)"></i></span>
  </div>
<v-drawer ref="drawer" v-model:show="isShow" action="add" title="请选择" :style="{width: 350}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <div v-for="(item, index) in dataList" :key="index">
      <div>
        <span @click="handleClick(item)">{{item.name}}</span>
      </div>
      <ul class="pl25">
        <li v-for="(data, i) in item.list" :key="i">
          <span @click="handleClick(data)">{{data.name}}</span>
          <div>
        <span @click="handleClick(list)" class="mr15" v-for="(list, k) in data.list" :key="k" >
          {{list.name}}
        </span>
          </div>
        </li>
      </ul>
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
    tagList: {
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
  emits: ['getTag'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const dataList: any = ref([])
    const coding: any = codings

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    //初始页面
    function init() {
      const cateCoding = coding[props.module].cate
      store.dispatch('common/Fetch', {
        api: "channelTag",
        data: {
          channel_id: "3"
        }
      }).then(res => {
        dataList.value = res.result
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

    function handleClick(param: any) {
        context.emit("getTag", param)
    }
    function handleDelete(index: any){
      props.tagList.splice(index, 1)
    }

    return {
      isShow,
      drawer,
      handleClick,
      handleChoose,
      dataList,
      handleDelete
    }
  }
})
</script>

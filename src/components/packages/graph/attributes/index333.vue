<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-anonymous-iconfont`" />选择意图
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="选择意图 " :submit="submit" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <table class="table-striped">
      <tr>
        <td class="col-md-2">选择</td>
        <td class="col-md-10">意图</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
        </td>
      </tr>
    </table>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore,
  onMounted
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  components: {
    
  },
  props: {
    action: {
      type: String,
      default: "add"
    },
    data: {
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
    }
  },
  emits: ['save'],
  setup(props, context) {
    const store = useStore();
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const showGraph = ref(false)
    const dataList: any = ref([])
    const drawer: any = ref(null)
    const List: any = ref([])
    const speech_lib: any = ref([])
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        let result = init()
        dataList.value = result
      }
    })  
    
    function init(){
      store.dispatch('common/Fetch', {
        api: "speechLib",
      }).then(res => {
        dataList.value = res.result
      })
    }

    function submit(){
      const Arrs: any = []
      checkedList.value.map((index: any)=>{
        let arr: any = ""
        arr =  dataList.value.filter((item: any) => item.id === index)
        Arrs.push({
          id: arr[0].id,
          name: arr[0].name,
          speech: ""
        })
      })
      
      props.data.push = Arrs
      context.emit('save', Arrs)
    }

    // onMounted(() => {
    //   debugger
    //   
    // })


    return {
      isShow,
      showGraph,
      checkedList,
      speech_lib,
      List,
      dataList,
      drawer,
      submit
    }
  }
})
</script>

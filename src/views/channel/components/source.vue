<template>
<v-button v-model:show="isShow" :disabled="auth">
  来源列表
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" title="来源列表" :style="{width: 550}" :submit="submit">
  <template v-slot:content v-if="isShow">
  <table class="table-striped table-hover col-left-12">
    <tr class="th">
      <td class="col-md-2">标题 </td>
      <td class="col-md-6">地址</td>
      <td class="col-md-1">状态</td>
    </tr>
    <tr v-for="(item, index) in dataList" :key="index" @click="handleClick(item)">
      <td>{{item.source_name}}</td>
      <td>{{item.source_url}}</td>
      <td><i class="iconfont icon-dagou" :class="{'cl-green': currentData.id === item.id}"></i></td>
    </tr>
  </table>

    <!-- <div v-for="(item, index) in dataList" :key="index" :class="{'bg-gray': currentData.id === item.id}" @click="handleClick(item)">
      
    </div> -->
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  computed,
  channels,
  useProps,
  codings
} from '@/utils'
import { customize11, checkbox, channleSubmit } from '@/utils/fn'
import {
  tabsDetail
} from '@/assets/const/index'
  const props: any = defineProps(useProps)
    const store = useStore()
    const isShow: any = ref(false)
    const coding: any = codings.content_source
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const dataList: any = ref({})
    const img: any = ref("")
    const flagList: any = ref([])
    const customizeDetail: any = ref({})
    const columnsList: any = ref([])
    const channelData: any = channels();
    const currentData: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init(){
      store.dispatch('common/Fetch', {
        data: {
          coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any){
      currentData.value = param
    }

    function submit() {
      debugger
      props.data.url = currentData.value.source_url
      isShow.value = false
    }
</script>

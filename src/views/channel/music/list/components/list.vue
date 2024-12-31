<template>
<table class="table-striped table-hover col-left-1">
  <tr class="th">
    <td class="col-md-2">歌曲</td>
    <td class="col-md-1">风格</td>
    <td class="col-md-1">试听</td>
    <td class="col-md-1">时长</td>
    <td class="col-md-1">大小</td>
    <td class="col-md-1">格式</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td>{{item.title}}</td>
    <td>{{item.parent}}</td>
    <td><v-audio :data="{...item, index, number: dataList.list.length}" /></td>
  <td> {{durationTrans(item.duration)}}</td>
  <td> {{`${(item.size / 1024 / 1024).toFixed(2)}MB`}}</td>
  <td> {{item.format}}</td>
  </tr>
</table>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  durationTrans,
  onMounted,
  codings,
  useProps
} from '@/utils'
const props: any = defineProps({
  showType: {
    type: String,
    default: 'singer'
  },
  ...useProps
})
const store = useStore()
const isShow: any = ref(false)
const coding: any = codings.music.art
const detail: any = ref({})
const drawer: any = ref(null)
const dataList: any = ref([])

function init(param: any = {}) {
  const params: any = {
    page: 1,
    pagesize: 10
  }

  Object.assign(params, param)
debugger
  if(props.showType === 'singer'){
    params.singer_id = props.data.singer_id
  }else{
    params.album_id = props.data.album_id
  }

  store.dispatch('channel/musicListAction', {
    isStore: true,
    data: {
      coding,
      ...params
    }
  }).then((res: any) => {
    dataList.value = res.result
  })
}

onMounted(() => {
  init()
})
</script>

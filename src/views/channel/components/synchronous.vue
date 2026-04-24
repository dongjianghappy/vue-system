<template>
<v-button v-model:show="isShow" :disabled="true">
  同步
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="同步" :style="{width: '800'}" confirmName="同步" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="mb10 p5">频道</div>
    <div class="clearfix">
      <div class="p10 left" style="width: 10%" v-for="(item, index) in dataList" :key="index">
        <div class="p5 align_center" style="background: #eee" :class="{current: currentChannel.id === item.id}" @click="handleClick(item)">{{item.name}}</div>
      </div>
    </div>
    <div class="mtb10 p5">分类</div>
    <div class="clearfix">
      <div v-for="(item, index) in cateList" :key="index">
        <div class="mb10">
          <span class="p10 bold align_center inline" :class="{current: currentCate.id === item.id}" @click="handleCate({...item, value: `|${item.id}|`})">{{item.name}}</span>
        </div>
        <div class="clearfix">
          <span class="mb10 p10 left" v-for="(list, index) in item.list" :key="index" :class="{current: currentCate.id === list.id}" @click="handleCate({...list, value: `|${item.id}|${list.id}|`})">
            {{list.name}}
          </span>
        </div>
      </div>
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  ref,
  useStore,
  watch,
  codings
} from '@/utils'
import Praise from '../../features/praise/list.vue'
import Reply from '../../features/comment/reply/reply.vue'

  const props: any = defineProps({
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore()
    const isShow: any = ref(false)
    const dataList: any = ref([])
    const cateList: any = ref([])
    const currentChannel: any = ref({})
    const currentCate: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function handleClick(param: any){
      currentChannel.value = param
      currentCate.value = {}
      getCate()
    }

    function handleCate(param: any){
      currentCate.value = param
    }

    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: 'channelList'
      }).then(res => {
        dataList.value = res.result
      })
    }

    function getCate() {
      store.dispatch('common/Fetch', {
        api: 'cateList',
        data: {
          coding: codings[currentChannel.value.module].cate
        }
      }).then(res => {
        cateList.value = res.result
      })
    }

  // 保存到草稿箱
  function submit() {
    store.dispatch('common/Fetch', {
      api: "synchronous",
      data: {
        coding: props.data.coding.art,
        targetCoding: codings[currentChannel.value.module].art,
        id: props.data.id,
        fid: currentCate.value.value
      }
    }).then(res => {
        proxy.$hlj.message({
          msg: "同步成功"
        })
    })
  }
</script>

<style lang="less" scoped>
.current{
  background: #1890ff !important;
  padding: 0 5px;
  border-radius: 2px;
  color: #fff;
}
</style>
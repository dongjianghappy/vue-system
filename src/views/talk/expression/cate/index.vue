<template>
<div class="module-wrap">
  <div class="module-content p20">
    <div style="height: auto; overflow: hidden;">
      <div class="mb15 font14">表情分类
        <span class="right">
          <Detail action="add" :data="{coding: data.coding}" :render="init" />
        </span>
      </div>
      <div class="col-md-1 p5" v-for="(item, index) in dataList" :key="index">
        <div class="p10" :class="{current: currentIndex == index}" style="background: #f9f9f9" @click="handleClick(item, index)">
          {{item.name}}
          <span class="right">
            <Detail action="edit" :data="{id: item.id, coding: data.coding}" :render="init" /></span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  ref,
  useStore,
  useProps
} from '@/utils'
import Detail from './detail.vue'
  const props: any = defineProps(useProps)
    const store = useStore()
    const dataList: any = ref([])
    const currentIndex: any = ref("")

    function init() {
      dataList.value = []
      store.dispatch('common/Fetch', {
        data: {
          coding: props.data.coding,
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any, index: any) {
      currentIndex.value = index
      props.render({
        fid: param.id
      })
    }
    onMounted(() => {
      init()
    })
</script>

<style scoped>
.current{
  background: #3c3c47 !important;
  color: #fff;
}
</style>
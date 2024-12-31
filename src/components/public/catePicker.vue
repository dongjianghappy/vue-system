<template>
<v-popover content="<i class='iconfont icon-list' />" arrow="tb" offset="right" :move="-650" keys="cateList">
  <div class="p15" style="width: 750px; height: 300px;">
    <perfect-scrollbar>
      <div class="item_t" style="min-height: 120px">
        <div v-for="(item, index) in cateList" :key="index">
          <div @click="handleCate(item.id)">{{item.name}}</div>
          <div id="goods-type-list" v-for="(list, i) in item.list" :key="i">
            <div class="left"><a @click="handleCate(list.id)">{{list.name}}</a> </div>
            <div class="right">
              <a class="" v-for="(data, j) in list.list" :key="j" @click="handleCate(data.id)">{{data.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</v-popover>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  defineProps,
  defineEmits,
  ref,
  onMounted
} from 'vue'
import { useStore } from 'vuex'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit: any = defineEmits(['choose'])
const store = useStore()
const cateList: any = ref([])

function init() {
  store.dispatch('channel/cateListAction', {
    module: props.data.module,
    data: {
      coding: props.data.coding.cate
    }
  }).then(res => {
    cateList.value = res.result
  })
}

function handleCate(param: any) {
  emit('choose', param)
}

onMounted(() => {
  init()
})
</script>

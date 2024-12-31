<template>
<Cate title="背景特效" :data="{coding: coding.cate}" :render="init" />
<Collect :data="{coding}" :dataList="dataList" v-if="currentCate.fid === '2'" />
<List :data="{coding}" :dataList="dataList" v-else />

</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'
import Cate from './cate/index.vue'
import List from './components/list.vue'
import Collect from './components/collect.vue'
    const store = useStore();
    const coding = codings.expression
    const currentCate = ref({})
    const dataList: any = ref([]);
    const checkedList: any = ref([])

    function init(param: any = {}) {
      dataList.value = []
      currentCate.value = param
      const params: any = {}
      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        api: param.fid == '2' ? "userExpression" : "emoticonsList",
        data: {
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

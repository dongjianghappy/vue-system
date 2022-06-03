<template>
  <span @click="handleclick" class="pointer"><i class="iconfont icon-mail"></i>保存</span>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, useStore } from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();

    function handleclick(){
     let form: any = []
      props.dataList && props.dataList.map((item: any) => {
        form.push({
          id: item.id,
          sort: item.sort
        })
      })
      store.dispatch('common/Save', {
        data: {
          coding: "P0001",
          data: JSON.stringify(form),
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
      })
    }
    return {
      handleclick
    }
  }
})
</script>

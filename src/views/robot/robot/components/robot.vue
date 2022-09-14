<template>
<div class="ant-card ant-card-bordered font12" style="background: #f9f9f9">
  <div class="ant-card-body">
    <div class="ant-statistic">
      <div class="blod" @click="handleClick(data)">
        <i class="iconfont icon-robot font18" style="color: #5bc0de"></i> {{data.name}}</div>
      <div class="mt10" style="color: rgb(63, 134, 0);">
        描述: {{data.summary}}</div>
    </div>
    <div class="mt10">状态: 上线</div>
    <div class="align_right" v-if="path === 'edit'">
      <Detail action="edit" :data="{id: data.id, coding: 'Q0014' }" :render="init" :auth="true" />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useRouter
} from '@/utils'

import Detail from '../components/detail.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Detail
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    data: {
      type: String,
      default: ""
    },    
    className: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
        click: {
      type: String,
      default: ""
    },
    path: {
      type: String,
      default: "version"
    }
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const router: any = useRouter();

    function handleClick(item: any) {
      let search = ""
      if(props.path === 'version'){
        search = `group=${item.id}`
      }else{
        search = `robotGroup=${item.id}&robotId=${item.id}`
      }
      router.push(`/admin/robot/${props.path}?${search}`)
    }
    return {
      handleClick
    }
  }
})
</script>

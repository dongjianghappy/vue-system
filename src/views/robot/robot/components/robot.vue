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
      <v-space>
        <span @click="handleView(data)" class="pointer"><i class="iconfont icon-chart" />查看</span>
        <Detail action="edit" :data="{id: data.id, coding: 'Q0014' }" :render="init" :auth="true" />
      </v-space>
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
  emits: ['update:graph'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const router: any = useRouter();

    function handleClick(item: any) {
      let search = ""
      if (props.path === 'version') {
        search = `group=${item.id}`
      } else {
        return
      }
      router.push(`/admin/robot/${props.path}?${search}`)
    }

    function handleView(param: any) {
      context.emit('update:graph', {
        view: true,
        data: param
      })
    }
    return {
      handleClick,
      handleView
    }
  }
})
</script>

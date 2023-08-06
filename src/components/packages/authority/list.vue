<template>
<v-tabs :tabs='[{
        name: "页面模块"
      },
      {
        name: "页面链接"
      },
      {
        name: "功能设置"
      }
    ]' method="click">
  <template v-slot:extra>
    <div class="pr5">
      <v-switch v-if="type==='manage'" :data="{ item: {id: dataList.id, status: dataList.status}, field: 'status', coding: codings.appstore }" @toggle="getValue" :auth="true" />
      <v-switch v-else :data="{ item: {id: dataList.id, authority: dataList.authority}, field: 'authority' }" :param="{uid: data.uid, field: dataList.value}" api="setUserFunctionAuthority" :msg="message" @toggle="getValue" :auth="true" />
    </div>
  </template>

  <template v-slot:content1>
    <List2 :dataList="dataList.list" :data="data" :type="type" :channel_id="channel_id" index="0" :render="render" />
  </template>
  <template v-slot:content2>
    <List2 :dataList="dataList.list" :data="data" :type="type" :channel_id="channel_id" index="1" :render="render" />
  </template>
  <template v-slot:content3>
    <List2 :dataList="dataList.list" :data="data" :type="type" :channel_id="channel_id" index="2" :render="render" />
  </template>
</v-tabs>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  codings
} from '@/utils'
import List2 from './list2.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    List2
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    channel_id: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    dataList: {
      type: Object,
      default: () => {
        return []
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();

    function getValue(){
      props.render()
    }

    function message(message: any) {
      proxy.$hlj.message({
        msg: message
      })
    }    
    
    return {
      codings,
      message,
      getValue
    }
  }
})
</script>

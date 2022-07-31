<template>
<v-tabs :tabs='[{
        name: "模块设置"
      },
      {
        name: "链接设置"
      },
      {
        name: "功能设置"
      }
    ]' method="click" :extra="false">
  <template v-slot:content1>
    <List2 :dataList="dataList" :data="data" :uid="uid" :type="type" :channel_id="channel_id" index="0" />
  </template>
  <template v-slot:content2>
    <List2 :dataList="dataList" :data="data" :uid="uid" :type="type" :channel_id="channel_id" index="1" />
  </template>
  <template v-slot:content3>
    <List2 :dataList="dataList" :data="data" :uid="uid" :type="type" :channel_id="channel_id" index="2" />
  </template>
</v-tabs>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore
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
     uid: {
      type: String,
      default: ""
    },
       channel_id: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    channel: {
      type: Object,
      default: []
    },
    dataList: {
      type: Object,
      default: () => {
        return []
      }
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    function handelExpand(param: any) {
      param.extand = !param.extand
    }

    function handelBuild() {
      store.dispatch('common/Fetch', {
        api: 'refreshBuild'
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    function handleDefault(param: any) {
      store.dispatch('common/Fetch', {
        api: 'setDefault',
        data: {
          id: param.id,
          fid: param.fid
        }
      }).then(res => {
      })
    }

    return {
      handelExpand,
      handelBuild,
      handleDefault
    }
  }
})
</script>

<style scoped>
.extand {
  display: none;
}
</style>

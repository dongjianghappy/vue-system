<template>
<div class="bg-white mb15" v-for="(item, i) in dataList && dataList.filter((data) => data.type === index)" :key="i">
  <div class="ptb15" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgb(240, 240, 240);">
    <div style="display: flex; height: 32px; line-height: 32px;">
      <div class="mr15" style="display: flex; padding-top: 7px;">
        <span class="deg90" :class="{'deg360': item.extand}" @click="handelExpand(item)">
          <i class="iconfont icon-arrow arrow"></i>
        </span>
        {{item.name}}
      </div>
    </div>
    <div v-if="type==='manage'" style="display: flex; justify-content: space-between;">
      <AddPage :data="{id: item.id, ...data}" :render="init" action="edit" :channel="channel" />
      <AddModule :data="{fid: item.id, ...data}" :render="init" action="add" :index="index" />
    </div>
  </div>
  <div>
    <ul style="padding-left: 30px;">
      <li class="li mb15" :class="{'extand': item.extand}" v-for="(list, i) in item.list" :key="i">
        <span class="label">
          {{list.name}}
          <i class="iconfont icon-ban cl-red" v-if="list.ban === '1'" />
          <AddModule :data="{id: list.id, ...data}" :render="init" action="edit" :index="index" v-if="type==='manage'" />
        </span>
        <v-switch v-if="type==='manage'" :data="{ item: list, field: 'status', ...data }" className="right" :auth="true" />
        <v-switch v-else :data="{ item: list, field: 'authority', ...data }" :param="{uid: uid, field: list.value, channel_id: channel_id}" api="setUserAuthority" :msg="message" className="right" :auth="true" />
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore
} from '@/utils'
import AddPage from './addPage.vue'
import AddModule from './addModule.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    AddPage,
    AddModule
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ""
    },
     uid: {
      type: String,
      default: ""
    },
      channel_id: {
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
    index: {
      type: String,
      default: "0"
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()

    function handelExpand(param: any) {
      param.extand = !param.extand
    }

    function handleDefault(param: any) {
      store.dispatch('common/Fetch', {
        api: 'setDefault',
        data: {
          id: param.id,
          fid: param.fid
        }
      }).then(res => {})
    }
function message(message: any) {
      proxy.$hlj.message({
        msg: message
      })
}
    return {
      handelExpand,
      handleDefault,
      message
    }
  }
})
</script>

<style scoped>
.extand {
  display: none;
}
</style>

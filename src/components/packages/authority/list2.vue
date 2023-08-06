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
      <AddPage :data="{id: item.id, ...data}" action="edit" :channel="channel" :render="render" />
      <AddModule :data="{fid: item.id, ...data}" action="add" :index="index" :render="render" />
    </div>
  </div>
  <div class="form-wrap-box">
    <ul style="padding-left: 30px;">
      <li class="li mt5 mb10" style="padding: 0px 5px 0px 146px;" :class="{'extand': item.extand}" v-for="(list, i) in item.list" :key="i" draggable="true" @dragend="handleDragEnd($event, item.list)" @dragstart="handleDragStart($event, list)" @dragenter="handleDragEnter($event, item.list, list)" @dragover.prevent="handleDragOver($event)">
        <span class="label">
          {{list.name}}
          <i class="iconfont icon-ban cl-red" v-if="list.ban === '1'" />
          <AddModule :data="{id: list.id, ...data}" action="edit" :index="index" :render="render" v-if="type==='manage'" />
          <span v-if="type==='manage'">
            <i class="iconfont icon-right" v-if="list.is_default === '1'" @click="handleDefault(list)" />
            <i class="iconfont icon-error" v-else @click="handleDefault(list)" />
          </span>
        </span>
        <span class="right">
        <v-switch v-if="type==='manage'" :data="{ item: list, field: 'status', ...data }" className="right" api="setTalkAuthority" :msg="message" :auth="true" />
        <v-switch v-else :data="{ item: list, field: 'authority', ...data }" :param="{uid: data.uid, field: list.value, channel_id: channel_id}" api="setUserAuthority" :msg="message" className="right" :auth="true" />
        </span>
        <span class="right mr15" v-if="type==='manage'">
          <Grade :data="{id: list.id, name: list.name, grade: list.grade, channel_grade: list.channel_grade}" :coding="data.coding" :render="render" />
          <span>
            <span><i class="iconfont icon-dagou" :class="list.grade && list.grade[0].visitors === '1' ? 'cl-green': 'cl-ccc'" /></span>
            <span><i class="iconfont icon-dagou" :class="list.grade && list.grade[0].ordinary_member === '1' ? 'cl-green': 'cl-ccc'" /></span>
            <span><i class="iconfont icon-dagou" :class="list.grade && list.grade[0].senior_member === '1' ? 'cl-green': 'cl-ccc'" /></span>
            <span><i class="iconfont icon-dagou" :class="list.grade && list.grade[0].vip_member === '1' ? 'cl-green': 'cl-ccc'" /></span>
            <span><i class="iconfont icon-dagou" :class="list.grade && list.grade[0].super_vip_member === '1' ? 'cl-green': 'cl-ccc'" /></span>
          </span>
        </span>
      </li>
    </ul>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  ref
} from '@/utils'
import AddPage from './addPage.vue'
import AddModule from './addModule.vue'
import Grade from './grade.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    AddPage,
    AddModule,
    Grade
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
    const store = useStore()
    const dragging: any = ref(null)
    const moveIndex: any = ref("")
    const enterIndex: any = ref("")

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
      })
    }

    function handleDragStart(e: any, item: any) {
      dragging.value = item
    }

    function handleDragEnd(e: any, list: any) {
      let item = list.splice(enterIndex.value, 1, dragging.value)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
      list[moveIndex.value] = item;
      moveSave(list)
    }

    function handleDragOver(e: any) {
      e.dataTransfer.dropEffect = 'move'
    }

    function handleDragEnter(e: any, list: any, item: any) {
      e.dataTransfer.effectAllowed = 'move'

      if (item === dragging.value) {
        return
      }
      const newItems = list
      moveIndex.value = newItems.findIndex((i: any) => {
        return i === dragging.value
      })

      enterIndex.value = newItems.findIndex((i: any) => {
        return i === item
      })
    }

    function moveSave(list: any) {
      let form: any = []
      list.map((item: any, index: any) => {
        item.sort = 1 + index
        form.push({
          id: item.id,
          sort: item.sort,
        })
      })
      store.dispatch('common/Fetch', {
        api: 'updateSave',
        data: {
          coding: props.data.coding,
          data: JSON.stringify(form),
        }
      })
    }

    function message(message: any) {
      proxy.$hlj.message({
        msg: message
      })
    }
    return {
      handelExpand,
      handleDefault,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
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

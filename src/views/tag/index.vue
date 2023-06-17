<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="核心词">
      <template v-slot:extraright>
        <v-popover content="频道" arrow="tb" offset="right" :move="-250" keys="calendar">
          <div style="width: 350px; height: 200px;">
            <ul class="p10 font14 align_center">
              <li class="col-md-3 mb5" @click="handleChannel()">所有</li>
              <li class="col-md-3 mb5" v-for="(item, index) in channel" :key="index" @click="handleChannel(item.id)">
                {{item.name}}
              </li>
            </ul>
          </div>
        </v-popover>
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">id</td>
        <td class="col-md-7">名称</td>
        <td class="col-md-1">频道</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.id}}
        </td>
        <td>
          {{item.name}}
        </td>
        <td>{{item.channel ? item.channel : "-" }}</td>
        <td>
          <v-space>
            <span>
              <Detail action='edit' :data="{id: item.id, coding }" :render="init" /></span>
            <span>删除</span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  useStore,
  useRoute,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import DetailFlag from './components/detailFlag.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    DetailFlag
  },
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings['tag'];
    const route = useRoute();
    const channelMenu: any = ref([])
    const channel: any = computed(() => store.getters['user/channel']);

    // 监听路由
    watch(route, (newValues, prevValues) => {
      init()
    })

    function init(param: any = {}) {
      let _param: any = {}
      if (route.path === '/admin/tag/core') {
        _param = {
          type: 1,
          ...param
        }
      } else if (route.path === '/admin/tag/target') {
        _param = {
          type: 2,
          ...param
        }
      } else {
        _param = {
          type: 0,
          ...param
        }
      }
      const params: any = {
        page: 1,
        pagesize: 50
      }

      Object.assign(params, _param)

      store.dispatch('common/Fetch', {
        data: {
          coding: coding,
          ...params
        }
      }).then(res => {
        dataList.value = res.result.list
        debugger
        dataList.value.map((item: any) => {
          let arr = channel.value.filter((list: any) => list.id === item.channel_id)
          item.channel = (arr && arr[0] && arr[0].name) || ""
        })
      })
      channelMenu.value = []
      channel.value.map((item: any) => {
        channelMenu.value.push({
          value: item.id,
          name: item.name
        })
      })

    }

    function handleChannel(param: any) {
      init({
        channel_id: param
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      init,
      channel,
      channelMenu,
      handleChannel
    }
  }
})
</script>

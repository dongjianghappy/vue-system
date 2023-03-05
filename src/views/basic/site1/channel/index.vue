<template>
<div class="mask" :class="{'fixed': isMove}" v-show="isMove"></div>
<div class="module-wrap" :class="{'z-index': isMove}">
  <div class="module-head">
    <v-optionsbar :title="`${route.query.name}导航列表`">
      <template v-slot:extraleft>
        <Popover :content="`主导航`" arrow="tb" offset="right" :move="-35" :keys="`static111}`">
          <ul>
            <li class="font14" style="line-height: 35px;" @click="handleClicksss(item, i)" v-for="(item, i) in navType" :key="i">{{item.name}}</li>
          </ul>
        </Popover>
      </template>
      <template v-slot:extraright>
        <space>
          <v-buttonexpand :data="dataList" type="all" />
          <v-buttonmoves v-model:move="isMove" />
          <Detail action='add' :data="{channel_id: route.query.channel,  coding }" :disabled="isMove" :render="init" :checkboxList="aaa" :auth="auth.checked('add')" />
        </space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-5"><span class="icon-cate"></span>名称</td>
        <td class="col-md-3">连接</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <template v-for="(item, index) in dataList" :key="index">
        <tr :draggable="isMove" class="dragObj" :index="`0_${index}`">
          <td>
            <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
          </td>
          <td>
            <v-buttonexpand :data="item" />
            <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding }" :style="{width: '80%', ...jsonParse(item.style)}" width="80%" :auth="auth.checked('edit')" />
            <i class="iconfont icon-add"></i>
          </td>
          <td>
            <v-quick :value="item.url" :data="{ id: item.id, field: 'url', coding }" :auth="auth.checked('edit')" />
          </td>
          <td>
            <v-switch :data="{ item, field: 'status', coding }" :auth="auth.checked('edit')" />
          </td>
          <td>
            <v-space>
              <span>
                <Detail action="edit" :data="{id: item.id, coding}" :disabled="isMove" :param="param" :render="init" :checkboxList="aaa" :auth="auth.checked('edit')" />
              </span>
              <span>
                <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
              </span>
            </v-space>
          </td>
        </tr>
        <tr className="tr-slide" v-for="(data, i) in item.list" :key="i" v-show="item.isShow" :draggable="isMove" class="dragObj" :index="`1_${i}`" :findex="index">
          <td>
            <v-checkbox :checkedList="checkedList" :data="{ id: data.id}" />
          </td>
          <td><i class="cate-two"></i>
            <v-quick :value="data.name" :data="{ id: data.id, field: 'name', coding }" :style="{width: '80%', ...jsonParse(data.style)}" />
          </td>
          <td>
            <v-quick :value="data.url" :data="{ id: data.id, field: 'url', coding }" />
          </td>
          <td>
            <v-switch :data="{ item: data, field: 'status', coding }" />
          </td>
          <td>
            <v-space>
              <span>
                <Detail action="edit" :data="{id: data.id, coding}" :param="param" :render="init" :checkboxList="aaa" :auth="auth.checked('edit')" />
              </span>
              <span>
                <v-confirm name="删除" :data="{id: data.id, coding}" type="text" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
              </span>
            </v-space>
          </td>
        </tr>
      </template>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" disabled="isMove" :data="{id: checkedList, coding }" :sorceData="dataList" :render="init" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRoute,
  jsonParse,
} from '@/utils'
import {
  NAV_TYPE,
} from '@/assets/enum'
import Detail from './components/detail.vue'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Popover
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = proxy.$coding['navigation'].main;
    const dataList: any = ref([])
    const checkedList: any = ref([])
    const isMove: any = ref(false)
    const aaa: any = ref([])
    const navType: any = NAV_TYPE

    function init() {
      store.dispatch('common/Fetch', {
        api: "navigation",
        data: {
          channel: route.query.channel
        }
      }).then(res => {
        dataList.value = res.result.list

        setTimeout(() => {
          proxy.$drag.init((res: any) => {

            const moveIndex = res.moveIndex.substring(2)
            const enterIndex = res.enterIndex.substring(2)
            const list = res.findex !== null ? dataList.value[res.findex].list : dataList.value
            const dragItem = list[moveIndex] // 拖拽列
            const item = list.splice(enterIndex, 1, dragItem)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
            list[moveIndex] = item;
            let form: any = []
            const loop = (data: any) => {
              return data.map((item: any, index: any) => {
                item.sort = 1 + index
                form.push({
                  id: item.id,
                  sort: item.sort,
                })
                if (item.list) {
                  loop(item.list)
                }
              })
            }

            loop(dataList.value)
            store.dispatch('common/Save', {
              data: {
                coding,
                data: JSON.stringify(form),
              }
            })
          })
        }, 3000)

      })
    }

    function checkbox() {
      store.dispatch('common/Fetch', {
        api: "getTagCheckbox",
        data: {
          channel_id: route.query.channel,
          type: 'cat'
        }
      }).then(res => {
        aaa.value = res.result
      })
    }

    onMounted(() => {
      init()
      checkbox()
    })

    return {
      store,
      route,
      coding,
      dataList,
      checkedList,
      init,
      aaa,
      navType,
      isMove,
      jsonParse,
      auth: proxy.$auth.init('navigation/main')
    }
  }
})
</script>

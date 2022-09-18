<template>
<div class="mask" :class="{'fixed': isMove}" v-show="isMove"></div>
<div class="module-wrap" :class="{'z-index': isMove}">
  <div class="module-head">
    <v-optionsbar title="推广管理">
      <template v-slot:extraright>
        <v-buttonmoves v-model:move="isMove" />
        <Detail :data="{ coding }" :disabled="isMove" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr>
        <td class="col-md-1">选择</td>
        <td class="col-md-2">推广名称</td>
        <td class="col-md-3">推广链接</td>
        <td class="col-md-1">价格</td>
        <td class="col-md-2">时间</td>
        <td class="col-md-1">浏览</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :draggable="isMove" class="dragObj" :index="`0_${index}`">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
        </td>
        <td>
          {{item.name}}
        </td>
        <td>{{item.url}}</td>
        <td>{{item.price}}</td>
        <td>{{item.price}}</td>
        <td>{{item.visit}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />
        </td>
        <td>
          <v-space>
            <Detail action="edit" :data="{id: item.id, coding }" :disabled="isMove" :render="render" />
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
  useStore,
  codings,
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'SpreadViewdd',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings['spread'];
    const store = useStore();
    const dataList: any = ref([])
    const isMove: any = ref(false)

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result.list
        setTimeout(() => {
          proxy.$drag.init((res: any) => {

            const moveIndex = res.moveIndex.substring(2)
            const enterIndex = res.enterIndex.substring(2)

            const list = res.findex !== null ? dataList.value[res.findex].list : dataList.value

            const dragItem = list[moveIndex] // 拖拽列
            debugger
            const item = list.splice(enterIndex, 1, dragItem)[0]; // 这一步是将要替换的删除，并将移动的插入，最后返回被删除的数组
            list[moveIndex] = item;
            let form: any = []
            const loop = (data: any) => {
              return data.map((item: any, index: any) => {
                item.sort = 1 + index
                form.push({
                  id: item.id,
                  sort: item.sort,
                  // isshow: item.isshow,
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

    onMounted(init)

    return {
      dataList,
      coding,
      isMove
    }
  }
})
</script>

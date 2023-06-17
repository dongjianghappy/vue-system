<template>
<div class="mask" :class="{'fixed': isMove}" v-show="isMove"></div>
<div class="module-wrap" :class="{'z-index': isMove}">
  <div class="module-head">
    <v-optionsbar title="路由菜单">
      <template v-slot:extraright>
        <v-space>
          <v-buttonexpand :data="dataList" type="all" />
          <v-buttonmoves v-model:move="isMove" />
          <Detail action='add' :data="{ coding }" :disabled="isMove" :render="init" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped col-left-12">
      <tr class="th">
        <td class="col-md-6"><span class="icon-cate"></span>页面名称</td>
        <td class="col-md-3">路径</td>
        <td class="col-md-3">操作</td>
      </tr>
      <template v-for="(item, index) in dataList" :key="index">
        <tr :draggable="isMove" class="dragObj" :index="`0_${index}`">
          <td>
            <v-buttonexpand :data="item" />

            <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding }" :style="{width: '80%'}" :auth="true" />
          </td>
          <td>
            <v-quick :value="item.path" :data="{ id: item.id, field: 'path', coding }" :auth="true" />
          </td>
          <td>
            <v-space>
              <ButtonDetail action='edit' :name="item.name" :data="{fid: item.id, type: 1, coding }" :disabled="isMove" :render="init" />
              <Detail action='add' :data="{ coding }" :datas="item" :disabled="isMove" :render="init" />
              <Detail action='edit' :data="{ id: item.id, coding }" :disabled="isMove" :render="init" />
            </v-space>
          </td>
        </tr>
        <template v-for="(data, indexs) in item.list" :key="indexs">
          <tr v-show="item.isShow" :draggable="isMove" class="dragObj" :index="`1_${indexs}`" :findex="index">
            <td>
              <i class="cate-two"></i>
              <v-buttonexpand :data="data" />
              <v-quick :value="data.name" :data="{ id: data.id, field: 'name', coding }" :style="{width: '60%'}" :auth="true" />
            </td>
            <td>
              <v-quick :value="data.path" :data="{ id: data.id, field: 'path', coding }" :auth="true" />
            </td>
            <td>
              <v-space>
                <ButtonDetail action='edit' :name="data.name" :data="{fid: data.id, type: 1, coding }" :disabled="isMove" :render="init" />
                <Detail action='add' :data="{ coding }" :datas="data" :disabled="isMove" :render="init" />
                <Detail action='edit' :data="{ id: data.id, coding }" :disabled="isMove" :render="init" />
              </v-space>
            </td>
          </tr>
          <template v-for="(datasss, i) in data.list" :key="i">
            <tr v-show="data.isShow" :draggable="isMove" class="dragObj" :index="`2_${i}`" :findex="indexs">
              <td>
                <i class="cate-tree"></i><i class="cate-two"></i>
                <v-buttonexpand :data="datasss" />
                <v-quick :value="datasss.name" :data="{ id: datasss.id, field: 'name', coding }" :style="{width: '40%'}" :auth="true" />
              </td>
              <td>
                <v-quick :value="datasss.path" :data="{ id: datasss.id, field: 'path', coding }" :auth="true" />
              </td>
              <td>
                <v-space>
                  <ButtonDetail action='edit' :name="datasss.name" :data="{fid: datasss.id, type: 1, coding }" :disabled="isMove" :render="init" />
                  <Detail action='add' :data="{ coding }" :datas="datasss" :disabled="isMove" :render="init" />
                  <Detail action='edit' :data="{ id: datasss.id, coding }" :disabled="isMove" :render="init" />
                </v-space>
              </td>
            </tr>

            <tr v-for="(bbbbb, j) in datasss.list" :key="j" v-show="data.isShow" :draggable="isMove" class="dragObj" :index="`2_${j}`" :findex="i">
              <td>
                <i class="cate-tree"></i><i class="cate-two"></i><i class="cate-two"></i>
                <v-buttonexpand :data="bbbbb" />
                <v-quick :value="bbbbb.name" :data="{ id: bbbbb.id, field: 'name', coding }" :style="{width: '40%'}" :auth="true" />
              </td>
              <td>
                <v-quick :value="bbbbb.path" :data="{ id: bbbbb.id, field: 'path', coding }" :auth="true" />
              </td>
              <td>
                <v-space>
                  <ButtonDetail action='edit' :name="bbbbb.name" :data="{fid: bbbbb.id, type: 1, coding }" :disabled="isMove" :render="init" />
                  <Detail action='add' :data="{ coding }" :datas="bbbbb" :disabled="isMove" :render="init" />
                  <Detail action='edit' :data="{ id: bbbbb.id, coding }" :disabled="isMove" :render="init" />
                </v-space>
              </td>
            </tr>
          </template>
        </template>
      </template>
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
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
import ButtonDetail from './button/index.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    ButtonDetail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const coding = codings.authority
    const dataList: any = ref([])
    const isMove: any = ref(false)

    function init() {
      store.dispatch('common/Fetch', {
        api: "routerSelect",
        data: {
          type: 0,
          coding
        }
      }).then(res => {
        dataList.value = res.result
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

    function edit(param: any) {

    }

    onMounted(init)

    return {
      coding,
      dataList,
      edit,
      isMove,
      init
    }
  }
})
</script>

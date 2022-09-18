<template>
<div class="mask" :class="{'fixed': isMove}" v-show="isMove"></div>
<div class="module-wrap" :class="{'z-index': isMove}">
  <div class="module-head">
    <v-optionsbar title="分类管理">
      <template v-slot:extraright>
        <space>
          <v-buttonexpand :data="dataList" type="all" />
          <v-buttonmoves v-model:move="isMove" :auth="auth.checked('edit')" />
          <Detail action='add' :data="{ coding }" :disabled="isMove" :render="init" :checkboxList="aaa" :auth="auth.checked('add')" />
        </space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-8">分类名称</td>
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
            <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding: 'P0003' }" :style="{width: '40%', ...jsonParse(item.style)}" width="40%" :auth="auth.checked('edit')" />
            <i class="iconfont icon-add"></i>
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
                <v-confirm name="删除" :data="{id: item.id, coding}" :disabled="isMove" type="text" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
              </span>
            </v-space>
          </td>
        </tr>
        <template v-for="(data, i) in item.list" :key="i">
          <tr className="tr-slide" v-show="item.isShow" :draggable="isMove" class="dragObj" :index="`1_${i}`" :findex="index">
            <td>
              <v-checkbox :checkedList="checkedList" :data="{ id: data.id}" />
            </td>
            <td><i class="cate-two"></i>
              <v-buttonexpand :data="data" />
              <v-quick :value="data.name" :data="{ id: data.id, field: 'name', coding: 'P0003' }" :style="{width: '40%', ...jsonParse(data.style)}" :auth="auth.checked('edit')" />
            </td>
            <td>
              <v-switch :data="{ item: data, field: 'status', coding }" />
            </td>
            <td>
              <v-space>

                <span>
                  <Detail action="edit" :data="{id: data.id, coding}" :disabled="isMove" :param="param" :render="init" :checkboxList="aaa" :auth="auth.checked('edit')" />
                </span>
                <span>
                  <v-confirm name="删除" :data="{id: data.id, coding}" type="text" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
                </span>
              </v-space>
            </td>
          </tr>

          <tr className="tr-slide" v-for="(datass, j) in data.list" :key="j" v-show="data.isShow" :draggable="isMove" class="dragObj" :index="`2_${j}`" :findex="i">
            <td>
              <v-checkbox :checkedList="checkedList" :data="{ id: datass.id}" />
            </td>
            <td><i class="cate-tree"></i><i class="cate-two"></i>
              <v-quick :value="datass.name" :data="{ id: datass.id, field: 'name', coding: 'P0003' }" :style="{width: '40%', ...jsonParse(datass.style)}" :auth="auth.checked('edit')" />
            </td>
            <td>
              <v-switch :data="{ item: datass, field: 'status', coding }" />
            </td>
            <td>
              <v-space>

                <span>
                  <Detail action="edit" :data="{id: datass.id, coding}" :disabled="isMove" :param="param" :render="init" :checkboxList="aaa" :auth="auth.checked('edit')" />
                </span>
                <span>
                  <v-confirm name="删除" :data="{id: datass.id, coding}" type="text" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
                </span>
              </v-space>
            </td>
          </tr>
        </template>
      </template>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" :disabled="isMove" :data="{id: checkedList, coding }" :sorceData="dataList" :render="init" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  channels,
  jsonParse
} from '@/utils'
import {
  useStore
} from 'vuex'

import Detail from './components/detail.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const channelData: any = channels();
    const store = useStore();
    const coding: any = channels().coding.cate;
    const checkedList: any = ref([])
    const aaa: any = ref([])
    const isMove: any = ref(false)

    const dataList = computed(() => {
      return store.getters[`channel/${channelData.module}`]['cateList']
    });

    function init() {
      store.dispatch('channel/cateListAction', {
        module: channelData.module,
        data: {
          coding
        }
      }).then(res => {
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

    function checkbox() {
      store.dispatch('common/Fetch', {
        api: "getFlag",
        data: {

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
      coding,
      dataList,
      checkedList,
      init,
      aaa,
      isMove,
      jsonParse,
      auth: proxy.$auth.init(`channel/${channelData.module}/cate`)
    }
  }
})
</script>

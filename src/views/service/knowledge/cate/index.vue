<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="知识分类">
      <template v-slot:extraright>
        <space>
          <v-buttonexpand :data="dataList" type="all" />
          <Detail action='add' :data="{ coding }" :render="init" :checkboxList="aaa" />
        </space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-2">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-7">分类名称</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">移动</td>
        <td class="col-md-2">操作</td>
      </tr>
      <template v-for="(item, index) in dataList" :key="index">
        <tr>
          <td>
            <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" />
          </td>
          <td>
            <v-buttonexpand :data="item" />
            <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding: 'P0003' }" :style="{width: '80%'}" />
            <i class="iconfont icon-add"></i>
          </td>
          <td>
            <v-switch :data="{ item, field: 'status', coding }" />
          </td>
          <td>

            <v-buttonmove :data="{dataList, item, index}" />
          </td>
          <td>
            <v-space>
              <span>
                <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" :checkboxList="aaa" />
              </span>
              <span>
                <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
              </span>
            </v-space>
          </td>
        </tr>

        <tr className="tr-slide" v-for="(data, index) in item.list" :key="index" v-show="item.isShow">
          <td>
            <v-checkbox :checkedList="checkedList" :data="{ id: data.id}" />
          </td>
          <td><i class="cate-two"></i>
            <v-quick :value="data.name" :data="{ id: data.id, field: 'name', coding: 'P0003' }" :style="{width: '80%'}" />
          </td>
          <td>
            <v-switch :data="{ item: data, field: 'status', coding }" />
          </td>
          <td>
            <v-buttonmove :data="{dataList: moveItem, item: data, index}" />
          </td>
          <td>
            <v-space>

              <span>
                <Detail action="edit" :data="{id: data.id, coding}" :param="param" :render="init" :checkboxList="aaa" />
              </span>
              <span>
                <v-confirm name="删除" :data="{id: data.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
              </span>
            </v-space>
          </td>
        </tr>
      </template>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList" :render="init" />
  </div>
</div>
</template>

<script lang="ts">
import Space from '@/components/common/Space.vue';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'

import Detail from './components/detail.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    Space
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const coding: any = codings['knowledge'].cate;
    const dataList: any = ref([])
    const checkedList: any = ref([])
    const aaa: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "cateList",
        data: {
          coding
        }
      }).then(res => {
        dataList.value = res.result
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
      aaa
    }
  }
})
</script>

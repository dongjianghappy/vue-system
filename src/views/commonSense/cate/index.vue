<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="常识种类">
      <template v-slot:extraright>
        <space>
          <Detail action='add' :data="{ coding }" :render="init" />
        </space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-2">
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
            <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding }" :style="{width: '40%'}" :auth="true" />
            <i class="iconfont icon-add"></i>
          </td>
          <td>
            <v-switch :data="{ item, field: 'status', coding }" :auth="true" />
          </td>
          <td>
            <v-space>
              <span>
                <Detail action="edit" :data="{id: item.id, coding}" :disabled="isMove" :param="param" :render="init" />
              </span>
              <span>
                <v-confirm name="删除" :data="{id: item.id, coding}" :disabled="isMove" type="text" api="delete" :render="init" operating="delete"></v-confirm>
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
              <v-quick :value="data.name" :data="{ id: data.id, field: 'name', coding }" :style="{width: '40%'}" :auth="true" />
            </td>
            <td>
              <v-switch :data="{ item: data, field: 'status', coding }" :auth="true" />
            </td>
            <td>
              <v-space>

                <span>
                  <Detail action="edit" :data="{id: data.id, coding}" :disabled="isMove" :param="param" :render="init" />
                </span>
                <span>
                  <v-confirm name="删除" :data="{id: data.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
                </span>
              </v-space>
            </td>
          </tr>

        </template>
      </template>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList" :render="init" />
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
  codings
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
    const store = useStore();
    const coding: any = codings['common_sense'].cate;
    const dataList: any = ref([])
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "cateList",
        data: {
          coding: coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })

    return {
      store,
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

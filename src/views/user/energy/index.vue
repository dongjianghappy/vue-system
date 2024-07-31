<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="能量管理">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-14">
      <tr class="th">
        <td class="col-md-2">名称</td>
        <td class="col-md-1">能力值</td>
        <td class="col-md-1">描述</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.value}}
        </td>
        <td>
          {{item.description}}
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  useStore,
  ref,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.energy;

    function init() {
      store.dispatch('basic/Fetch', {
        data: {
          coding: coding
        }
      }).then((res: any) => {
        debugger
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      init
    }
  }
})
</script>

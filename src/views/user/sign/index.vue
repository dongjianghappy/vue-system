<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="积分设置">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-14">
      <tr class="th">
        <td class="col-md-1">策略名称</td>
        <td class="col-md-1">周期</td>
        <td class="col-md-1">积分</td>
        <td class="col-md-7">积分说明</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.cycle}}
        </td>
        <td>
          {{item.integration}}
        </td>
        <td>
          {{item.explanation}}
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
    const coding: any = codings['user'].cycle;

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

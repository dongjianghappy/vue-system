<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="密保问题">
      <template v-slot:extraright>
        <!-- <Detail action='add' :data="{ coding }" :render="init" /> -->
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-4">
      <tr class="th">
        <td class="col-md-2">策略名称</td>
        <td class="col-md-1">周期</td>
        <td class="col-md-1">积分</td>
        <td class="col-md-6">描述</td>
        <td class="col-md-2">操作</td>
      </tr>
     
      <tr v-for="(item, index) in dataList.list" :key="index">
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
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
// import Detail from './components/detail.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    // Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList = computed(() => store.getters['basic/partner']);
    const coding: any = proxy.$coding['partner'];
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        state: 'partner',
        data: {
          coding: 'U0011',
          page: 1,
          pagesize: 10
        }
      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

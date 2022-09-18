<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="意图管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">意图名称</td>
        <td class="col-md-6">话术</td>
        <td class="col-md-2">发布状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.speech}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding }" :render="init" :auth="true" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="render" operating="delete"></v-confirm>
            </span>
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
  computed,
  ref,
  useStore,
  useRouter,
  codings
} from '@/utils'
import Detail from './components/detail.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const coding: any = "Q0015";
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "speechLib",
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      dataList

    }
  }
})
</script>

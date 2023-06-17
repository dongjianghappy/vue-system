<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="对话记录">
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">机器人</td>
        <td class="col-md-6">对话id</td>
        <td class="col-md-2">对话时间</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>{{item.robot}}</td>
        <td>{{item.sessionid}}</td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-space>
            <span @click="handleView(item.sessionid)">
              查看
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

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    
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
        api: "chat",
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleView(param: any){
      router.push(`/admin/robot/chat/list?sessionid=${param}`)
    }

    onMounted(init)

    return {
      coding,
      dataList,
      handleView

    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="机器人版本">
      <template v-slot:extraright>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <Robot name="用户总量" :data="item" path="edit" v-model:graph="showGraph" />
    </div>
    <Graph v-model:show="showGraph" :data="{coding: 'Q0014', detailApi: 'detail', updateApi: 'updateRobot', ...showGraph.data}" v-if="showGraph.view" />
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useStore,
  useRouter,
  codings
} from '@/utils'
import Robot from '../components/robot.vue'
import Graph from '../../graph/index.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Robot,
    Graph
  },
  setup(props, context) {
    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])
    const showGraph = ref({
      view: false,
      data: {}
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "robot",
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/vote/item?id=${param.id}`)
    }

    onMounted(init)

    return {
      dataList,
      showGraph,
      init,
      handleClick

    }
  }
})
</script>

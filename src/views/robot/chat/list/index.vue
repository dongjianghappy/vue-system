<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="对话详情">
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-3">
      <tr class="th">
        <td class="col-md-2">人物</td>
        <td class="col-md-2">对话时间</td>
        <td class="col-md-10">对话内容</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <i class="iconfont icon-robot font24" style="color: rgb(91, 192, 222);" v-if="item.type === '1'" />
          <span v-else>
            <img :src="item.photos" style="border-radius: 50%; width: 24px; height: 24px;" v-if="item.photos !== null" />
            <i class="iconfont icon-user font24" style="font-size: 24px !important;" v-else />
          </span>
        </td>
        <td>{{item.times}}</td>
        <td>
          {{item.chat}}
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
  codings,
  useRoute
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
    const coding: any = "Q0016";
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const route: any = useRoute()
    const dataList: any = ref([])
    debugger

    function init() {
      store.dispatch('common/Fetch', {
        api: "chatDetail",
        data: {
          sessionid: route.query.sessionid
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/robot/speech/list?id=${param.id}`)
    }

    onMounted(init)

    return {
      coding,
      init,
      dataList,
      handleClick

    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="对话详情">
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-3">
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

<script setup lang="ts">
import {
  onMounted,
  ref,
  useStore,
  useRouter,
  codings,
  useRoute
} from '@/utils'

    const coding: any = "Q0016";
    
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
    
    onMounted(init)
    
</script>

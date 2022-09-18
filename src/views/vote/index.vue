<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="投票管理">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-6">投票名称</td>
        <td class="col-md-2">投票人数</td>
        <td class="col-md-2">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.vote}}</td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" />
        </td>
        <td>
          <v-space>
            <span @click="handleClick(item)">
              查看
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
  onMounted,
  ref,
  useStore,
  useRouter,
  codings
} from '@/utils'
import Detail from './components/detail.vue'

export default defineComponent({
  name: 'VoteView',
  components: {
    Detail
  },
  setup(props, context) {
    const coding: any = codings['vote'].cate;
    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "selectVote",
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/vote/item?id=${param.id}`)
    }

    onMounted(init)

    return {
      coding,
      dataList,
      handleClick
    }
  }
})
</script>

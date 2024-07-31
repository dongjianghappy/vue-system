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
    <table class="table-striped table-hover col-left-1">
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
          <v-switch :data="{ item, field: 'checked', coding }" :auth="true" />
        </td>
        <td>
          <v-space>
            <span>
              <v-confirm name="审核" :data="{id: item.id, management_checked: 1, coding }" type="text" api="checkContent" :render="init" operating="check" :auth="true" v-if="item.management_checked !== '1'" />
              <span v-else>已审核</span>
            </span>
            <span @click="handleClick(item)">
              查看
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
            <span>
              <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding }" type="text" api="changeData" :render="init" operating="setTop" :auth="true"></v-confirm>
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
  name: 'Vote',
  components: {
    Detail
  },
  setup(props, context) {
    const coding: any = codings.module['vote'].art;
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
      handleClick,
      init
    }
  }
})
</script>

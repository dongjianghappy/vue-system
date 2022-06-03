<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="话题管理">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">话题</td>
        <td class="col-md-4">说明</td>
        <td class="col-md-1">参与人次</td>
        <td class="col-md-1">投票开启</td>
        <td class="col-md-2">创建时间</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.summary}}
        </td>
        <td>{{item.num}}</td>
        <td @click="handleClick(item)" :class="item.vote === '0' || 'red'">{{item.vote === '0' ? '未开启' : '已开启'}}</td>
        <td>
          {{item.datetime}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'checked', ...data }" />

        </td>
        <td>
          <span>删除</span>
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
  ref,
  watch,
  useRoute,
  useRouter,
  codings,
  useStore
} from '@/utils'

import Detail from './components/detail.vue'
import DetailFlag from './components/detailFlag.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    DetailFlag
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings['link'];
    const route = useRoute();
    const router = useRouter();

    function init(param: any) {
      store.dispatch('common/Fetch', {
        api: "activity",
        data: {
          page: 1,
          pagesize: 50
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(item: any) {
      let url: any = `/admin/vote/item?talkid=${item.id}&name=${item.name}`
      if(item.vote !== '0'){
        url = `/admin/vote/item/list?id=${item.vote}`
      }
      router.push(url)
    }

    onMounted(() => init('1'))

    return {
      dataList,
      handleClick

    }
  }
})
</script>

<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="话题管理">
      <template v-slot:extraright>
        <v-condition name="类型" icon="type" field="type" :enums="[{name: '学生', value: '1'}, {name: '体育', value: '2'}]" :render="init" />
        <Detail action='add' :data="{ coding: 'M10000' }" :render="init" />
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
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.summary}}
        </td>
        <td>{{item.num}}</td>
        <td @click="handleClick(item)" :class="item.vote === '0' || 'red'">
          <i class="iconfont icon-dot" :class="item.vote === '1' ? 'cl-green' : ''" />
          {{item.vote === '0' ? '未开启' : '已开启'}}</td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding: 'M10000' }" :auth="true" />

        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding: 'M10000'}" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: 'M10000' }" type="text" api="delete" :render="init" operating="delete" :auth="true"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list || []" />
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

    function init(param: any = {}) {
      const params: any = {
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)
      store.dispatch('common/Fetch', {
        data: {
          coding: 'M10000',
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(item: any) {
      let url: any = `/admin/vote/item?talkid=${item.id}&name=${item.name}`
      if (item.vote !== '0') {
        url = `/admin/vote/item/list?id=${item.vote}`
      }
      router.push(url)
    }

    onMounted(() => init('1'))

    return {
      dataList,
      handleClick,
      init
    }
  }
})
</script>

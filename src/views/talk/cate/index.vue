<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="分类">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">名称</td>
        <td class="col-md-8">说明</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-1">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.description}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="true" />

        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding}" :render="init" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="init" operating="delete" :auth="true"></v-confirm>
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
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.talk.cate;
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
          coding,
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

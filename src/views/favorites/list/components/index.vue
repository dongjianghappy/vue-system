<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="收藏夹">
      <template v-slot:extraright>
        <v-space>
          <Created :data="{ coding: coding.cate }" :render="init" />
          <Detail action='add' :data="{ coding }" :render="init" :auth="true" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">名称</td>
        <td class="col-md-6">链接</td>
        <td class="col-md-2">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index">
        <td>
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-quick :value="item.url" :data="{ id: item.id, field: 'url', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space>
            <Detail action="edit" :data="{id: item.id, coding }" :render="init" :auth="true" />
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.art }" type="text" api="delete" :render="init" operating="delete" :auth="true"></v-confirm>
            </span>
            <span>
              <v-confirm icon="top" :className="item.istop === '1' ? 'cl-red' : ''" :data="{id: item.id, field: 'istop', value: item.istop === '1' ? '0' : '1', coding: coding.art }" type="text" api="changeData" :render="init" operating="setTop" :auth="true"></v-confirm>
            </span>
          </v-space>
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
  useStore,
  useRouter,
  codings
} from '@/utils'
import Created from './components/created.vue'
import Detail from './components/detail.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Created,
    Detail
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const coding: any = codings['favorites'];
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "favorites"
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/vote/item?id=${param.id}`)
    }

    onMounted(init)

    return {
      init,
      coding,
      dataList,
      handleClick

    }
  }
})
</script>

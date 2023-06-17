<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="收藏管理">
      <template v-slot:extraright>
        <v-space>
          <v-condition name="帅选" field="fid" :enums="favorites" :render="init" />
          <Favorites :data="{ coding: coding.cate }" :render="init" />
          <Detail action='add' :data="{ coding: coding.art }" :favorites="favorites" :render="init" :auth="true" />
        </v-space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-2">名称</td>
        <td class="col-md-4">链接</td>
        <td class="col-md-2">收藏夹</td>
        <td class="col-md-2">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-quick :value="item.name" :data="{ id: item.id, field: 'name', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-quick :value="item.url" :data="{ id: item.id, field: 'url', coding: coding.art }" :auth="true" />
        </td>
        <td>{{item.parent}}</td>
        <td>
          <v-switch :data="{ item, field: 'checked', coding: coding.art }" :auth="true" />
        </td>
        <td>
          <v-space>
            <Detail action="edit" :data="{id: item.id, coding: coding.art }" :favorites="favorites" :render="init" :auth="true" />
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
import Favorites from './components/favorites.vue'
import Detail from './components/detail.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Favorites,
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
    const store = useStore();
    const router: any = useRouter();
    const dataList: any = ref([])
    const favorites = ref([])

    function init(params: any) {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding.art,
          ...params
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    // 收藏夹
    function getFavorites() {
      store.dispatch('common/Fetch', {
        api: "favorites",
      }).then((res: any) => {
        const data: any = []
        res.result.map((item: any) => {
          data.push({
            name: item.name,
            value: item.id
          })
        })
        favorites.value = data
      })
    }

    onMounted(() => {
      init({})
      getFavorites()
    })

    return {
      init,
      coding,
      dataList,
      favorites
    }
  }
})
</script>

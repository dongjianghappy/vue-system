<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="字段关联">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding }" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-2 pl25">注释</td>
        <td class="col-md-1">字段名</td>
        <td class="col-md-1">数据类型</td>
        <td class="col-md-1">长度</td>
        <td class="col-md-1">显示类型</td>
        <td class="col-md-3">说明</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>{{item.remark}}</td>
        <td>
          {{item.field}}
        </td>
        <td>
          {{item.dtype}}
        </td>
        <td>{{item.length}}</td>
        <td>{{item.text_type}}</td>
        <td>{{item.explanation}}</td>
        <td>
          <v-space>
            <Detail action='edit' :data="{id: item.id, coding }" :render="init" :auth="auth.checked('edit')" />
            <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete" :render="render" operating="delete" :auth="auth.checked('del')" ></v-confirm>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList || []" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useRoute,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
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
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings['customize'];
    const dataList: any = ref([])

    function init() {
      const {
        id
      }: any = route.query

      store.dispatch('common/Fetch', {
        api: "anpassen_field",
        data: {
          id
        }
      }).then(res => {
        dataList.value = res.result
      })
    }
    onMounted(init)

    return {
      coding,
      dataList,
      auth: proxy.$auth.init('customize')
    }
  }
})
</script>

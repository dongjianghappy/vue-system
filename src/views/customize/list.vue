<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="字段关联">
      <template v-slot:extraleft>
        <span class="pointer" style="margin-top: 1px;" @click="handleClick('return')">返回</span>
      </template>
      <template v-slot:extraright>
        <Detail action='add' :data="{channel_id,  coding }" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">

    <table class="table-striped table-hover col-left-1">
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
            <v-confirm name="删除" :data="{id: item.id, coding }" type="text" api="delete_columns" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
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
  codings,
  useRouter
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'ListView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    const coding: any = codings['custom'];
    const dataList: any = ref([])
    const channel_id: any = route.query.id

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

    function handleClick() {
      router.push(`/admin/customize`)
    }
    onMounted(init)

    return {
      coding,
      channel_id,
      dataList,
      init,
      handleClick,
      auth: proxy.$auth.init('customize')
    }
  }
})
</script>

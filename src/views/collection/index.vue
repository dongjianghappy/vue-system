<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="采集列表">
      <template v-slot:extraright>
        <Detail action="add" :data="{ coding }" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-6">节点名称</td>
        <td class="col-md-2">创建节点日期</td>
        <td class="col-md-2">数量(入库/总共)</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td>{{item.num}}/{{item.tem_num}}</td>
        <td>
          <v-space class="relative">
            <Detail action="edit" :data="{id: item.id, coding }" :render="init" :auth="auth.checked('edit')" />
            <Detail1 :auth="auth.checked('start')" />
            <v-popover content="更多" arrow="tb" offset="right" :move="-20" :keys="`static_${index}`" v-if="auth.checked('list') || auth.checked('tem') || auth.checked('del')">
              <ul class="font14" style="display: block">
                <li style="height: 32px" @click="handleSelectServer(`/admin/collection/list?fid=${item.id}&name=${item.name}`)" v-if="auth.checked('list')">列表</li>
                <li style="height: 32px" @click="handleSelectServer(`/admin/collection/temlist?fid=${item.id}&name=${item.name}`)" v-if="auth.checked('tem')">临时</li>
                <li style="height: 32px" @click="handleSelectServer(index)" v-if="auth.checked('del')">删除</li>
              </ul>
            </v-popover>
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
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  useRouter,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
import Detail1 from './components/detail1.vue'
export default defineComponent({
  name: 'VollectionViewdd',
  components: {
    Detail,
    Detail1,
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const coding: any = codings['collection'].cate;
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "nodeList"
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleSelectServer(param: any) {
      router.push(param)
    }

    onMounted(init)

    return {
      coding,
      dataList,
      handleSelectServer,
      init,
      auth: proxy.$auth.init('collection/cate')
    }
  }
})
</script>

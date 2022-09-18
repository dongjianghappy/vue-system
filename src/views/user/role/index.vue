<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="角色管理">
      <template v-slot:extraright>
        <Detail action='add' :data="{ coding: coding.role }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table width="100%" class="table-striped table-hover col-left-1">
      <tr class="th">
        <td class="col-md-4">名称</td>
        <td class="col-md-4">个数</td>
        <td class="col-md-2">新增日期</td>
        <td class="col-md-2">操作</td>
      </tr>

      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.num}}
        </td>
        <td>
          {{item.times}}
        </td>
        <td>
          <v-space>
            <Detail action='edit' :data="{id: item.id, coding: coding.role }" :render="init" />
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.role}" type="text" api="delete" :render="init" operating="delete"></v-confirm>
            </span>
            <ViewUser :data="{...item}" />
            <span @click="handleClick(item)">
              权限
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
  getCurrentInstance,
  onMounted,
  ref,
  useRouter
} from '@/utils'
import {
  useStore
} from 'vuex'
import Detail from './components/detail.vue'
import ViewUser from './components/viewUser.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Detail,
    ViewUser
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const dataList: any = ref([]);
    const coding: any = proxy.$coding['user'];
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'roleList',
        data: {
          coding: coding.role,
          page: 1,
          pagesize: 10
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any) {
      router.push(`/admin/user/role/grade?id=${param.id}`)
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init,
      handleClick
    }
  }
})
</script>

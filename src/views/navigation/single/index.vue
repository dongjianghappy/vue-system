<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="单页导航">
      <template v-slot:extraright>
        <v-button @onClick="handleClick('add')" :disabled="auth.checked('add')">
          <i class="iconfont icon-anonymous-iconfont" />新增单页
        </v-button>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-34">
      <tr class="th">
        <td class="col-md-1">选择</td>
        <td class="col-md-1">顺序</td>
        <td class="col-md-3">名称</td>
        <td class="col-md-3">文件</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index">
        <td>
          <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-quick :value="item.sort" :data="{ id: item.id, field: 'sort', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-quick :value="item.title" :data="{ id: item.id, field: 'title', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-quick :value="item.html" :data="{ id: item.id, field: 'html', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding }" :auth="auth.checked('edit')" />
        </td>
        <td>
          <v-space>
            <v-button @onClick="handleClick(item)" :disabled="auth.checked('edit')">
              编辑
            </v-button>
            <v-confirm name="删除" :data="{id: item.id, coding}" type="text" api="delete" :render="init" operating="delete" :auth="auth.checked('del')"></v-confirm>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList" />
    <v-buttongroup :checkedList="checkedList" :data="{id: checkedList, coding }" :sorceData="dataList" :render="init" :auth="auth" />
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
  useRoute,
  codings
} from '@/utils'
export default defineComponent({
  name: 'SingleView',
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const coding: any = codings.single;
    const dataList: any = ref([])
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "singleNav",
        data: {
          channel: route.query.channel
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(params: any) {
      let url = `/admin/navigation/single/add?channel=${route.query.channel}${params === 'add' ? '' : '&id='+params.id}`
      router.push(url)
    }

    onMounted(init)

    return {
      coding,
      dataList,
      checkedList,
      init,
      handleClick,
      auth: proxy.$auth.init('navigation/single')
    }
  }
})
</script>

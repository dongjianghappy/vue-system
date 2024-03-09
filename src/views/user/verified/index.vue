<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="V认证体系">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" :auth="auth.checked('add')" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-12">
  <tr class="th">
    <td class="col-md-2">名称</td>
    <td class="col-md-3">描述</td>
    <td class="col-md-1">身份认证</td>
    <td class="col-md-1">兴趣认证</td>
    <td class="col-md-1">文章/问答认证</td>
    <td class="col-md-1">视频认证</td>
    <td class="col-md-2">操作</td>
  </tr>
  <tr v-for="(item, index) in dataList.list" :key="index">
    <td>
      <i class="iconfont" :class="`icon-${item.icon}`" />
      {{item.name}}</td>
    <td>{{item.description}}</td>
    <td>
      <v-switch :data="{ item, field: 'identity', coding }" :auth="true" />
    </td>
    <td>
      <v-switch :data="{ item, field: 'interest', coding }" :auth="true" />
    </td>
    <td>
      <v-switch :data="{ item, field: 'questions', coding }" :auth="true" />
    </td>
    <td>
      <v-switch :data="{ item, field: 'video', coding }" :auth="true" />
    </td>
    <td>
      <Detail action="edit" :data="{id: item.id, coding}" :render="init" />
    </td>
  </tr>
</table>
    <v-nodata :data="dataList.list" />
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
  codings
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([]);
    const coding: any = codings.user.verified;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 10
        }
      }).then((res) => {
        dataList.value = res.result
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      dataList,
      checkedList,
      init,
      auth: proxy.$auth.init('partner')
    }
  }
})
</script>

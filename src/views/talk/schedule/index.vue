<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="日程">
      <template v-slot:extraright>
        <Detail :data="{ coding }" :render="init" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <table class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1">名称</td>
        <td class="col-md-8">描述</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.description}}
        </td>
        <td>
          {{item.name}}
        </td>
        <td>
          <Detail action="edit" :data="{ id: item.id, coding }" :render="init" />
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
  watch,
  useRoute,
  useStore,
  codings
} from '@/utils'
import {
  tabsSign
} from '@/assets/const'
import Detail from './components/detail.vue'

export default defineComponent({
  name: 'IndexView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings.user.schedule.cate
    const dataList: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0)

    // 监听路由
    watch(route, (newValues, prevValues) => {
      if (route.path === '/admin/talk/sign') {
        tabsIndex.value = route.query.type
        init()
      }
    })

    // 初始化
    function init() {

      store.dispatch('common/Fetch', {
        data: {
          coding: coding
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      tabsSign,
      coding,
      tabsIndex,
      init,
      dataList
    }
  }
})
</script>

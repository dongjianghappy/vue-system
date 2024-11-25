<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsThreeItem">
    <template v-slot:extra>
      <v-space>
        <Group :data="{ coding: coding.item_group }" />
        <Detail :data="{ coding: coding }" :render="init" :auth="false" />
      </v-space>
    </template>
    <template v-slot:content1>
      <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-8">物品</td>
        <td class="col-md-1">组</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          {{item.parent}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding: coding.item }" :disabled="false" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding: coding}" :param="param" :render="init" :auth="false" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.item}" api="delete" :render="init" operating="delete" :auth="false"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    </template>
    <template v-slot:content2>
      <table class="table-striped table-hover col-left-12">
      <tr class="th">
        <td class="col-md-9">物品</td>
        <td class="col-md-1">状态</td>
        <td class="col-md-2">操作</td>
      </tr>
      <tr v-for="(item, index) in dataList.list" :key="index" :index="index">
        <td>
          {{item.name}}
        </td>
        <td>
          <v-switch :data="{ item, field: 'status', coding: coding.item }" :disabled="false" />
        </td>
        <td>
          <v-space>
            <span>
              <Detail action="edit" :data="{id: item.id, coding: coding}" :param="param" :render="init" :auth="false" />
            </span>
            <span>
              <v-confirm name="删除" :data="{id: item.id, coding: coding.item}" api="delete" :render="init" operating="delete" :auth="false"></v-confirm>
            </span>
          </v-space>
        </td>
      </tr>
    </table>
    <v-nodata :data="dataList.list" />
    </template>

  </v-tabs>
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
  useRoute,
  useRouter,
  watch,
  codings
} from '@/utils'

import {
  tabsThreeItem
} from '@/assets/const'

import Group from './components/group.vue'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Group,
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const dataList: any = ref([])
    const coding: any = codings.three;
    const checkedList: any = ref([])

    // 监听路由
    watch(router.currentRoute, (newValues, prevValues) => {
      if (newValues.path === prevValues.path) {
        init()
      }
    })

    function init() {
      const {
        type
      }: any = route.query
      store.dispatch('basic/Fetch', {
        data: {
          coding: coding.item,
          page: 1,
          pagesize: 100,
          type: type === '0' ? 0 : 1
        }
      }).then((res: any) => {
        dataList.value = res.result || []
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      tabsThreeItem,
      dataList,
      checkedList,
      init
    }
  }
})
</script>

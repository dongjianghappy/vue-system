<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="路线管理">
      <template v-slot:extraright>
        <Detail :data="{ scene_id: data.id, coding }" :render="init" :auth="false" />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <div class="flex" v-for="(item, index) in dataList.list" :key="index" :index="index">
      <div style="flex: 1">{{item.name}}</div>
      <div style="width: 80px"><v-switch :data="{ item, field: 'status', coding }" :disabled="false" /></div>
      <div style="width: 80px">
        <v-space>
          <span>
            <Detail action="edit" :data="{id: item.id, coding}" :param="param" :render="init" :auth="false" />
          </span>
          <span>
            <v-confirm name="删除" :data="{id: item.id, coding}" api="delete" :render="init" operating="delete" :auth="false"></v-confirm>
          </span>
        </v-space>
      </div>
    </div>
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
import Detail from './detail.vue'
export default defineComponent({
  name: 'PartnerView',
  components: {
    Detail
  },
props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    const coding: any = codings.three.road_line ;
    const checkedList: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        data: {
          coding,
          page: 1,
          pagesize: 100,
          scene_id: props.data.id
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
      dataList,
      checkedList,
      init
    }
  }
})
</script>

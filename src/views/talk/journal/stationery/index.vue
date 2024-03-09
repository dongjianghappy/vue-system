<template>
<v-button v-model:show="isShow" :disabled="auth">
  信纸
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="日志信纸" :style="{width: '850'}" :hasfooter="false">
  <template v-slot:extra>
    <v-space>
      <Detail :data="{coding: coding.stationery}" :render="init" />
    </v-space>
  </template>
  <template v-slot:content v-if="isShow">
    <div class="col-md-4 p10" v-for="(item, index) in dataList.list" :key="index">
      <div class="p10" style="border: 1px solid #f0f0f0;">
        <div><img @click="handleClick(item)" :src="item.image && item.image[0]" style="width: 175px; height: 145px"></div>
        <div class="ptb15">{{item.name}}
          <Detail action="edit" :data="{id: item.id, coding: coding.stationery}" :render="init" />
          <span class="right" style="width: 20px; height: 20px;" :style="{background: item.background_color}"></span>
        </div>
      </div>
    </div>
    <v-nodata :data="dataList" />
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore,
  codings
} from '@/utils'
import {
  ANNOUNCEMENT_TYPE,
} from '@/assets/enum'
import Detail from './detail.vue'
export default defineComponent({
  name: 'v-Detail',
  components: {
    Detail
  },
  props: {
    action: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    auth: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const coding: any = codings.talk.journal
    const sourceType: any = ANNOUNCEMENT_TYPE
    const store = useStore();
    const drawer: any = ref(null)
    const dataList: any = ref({})
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding.stationery,
          page: 1,
          pagesize: 25
        }
      }).then((res: any) => {
        dataList.value = res.result
      })
    }

    return {
      coding,
      init,
      isShow,
      sourceType,
      dataList,
      drawer
    }
  }
})
</script>

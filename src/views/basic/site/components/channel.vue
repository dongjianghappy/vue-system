<template>
<v-button v-model:show="isShow" :disabled="auth">
  频道
</v-button>
<v-drawer v-model:show="isShow" title="网站频道" :style="{width: '400'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    <AddChannel action="add" :data="{fid: data.fid, coding: data.coding.channel}" />
  </template>
  <template v-slot:content>
    <v-collapse :title="item.name" v-for="(item, index) in dataList" :key="index">
      <template v-slot:extra>
    <AddPage action="add"  :data="{fid: item.id, coding: data.coding.page}" />
  </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.name}}
            <AddButton :data="{id: item.id, ...data}" :render="init" action="edit" />
          </span>
        </li>
      </ul>
    </v-collapse>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  useStore
} from '@/utils'
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  computed
} from '@/utils'
import AddChannel from './addChannel.vue'
import AddPage from './addPage.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    AddChannel,
    AddPage
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    setRoute: {
      type: Function,
      default: () => {
        return
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore()

    const isShow: any = ref(false)
    const dataList: any = ref([])
    const setting = computed(() => store.getters['user/setting']);

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "siteChannel",
        data: {
          fid: props.data.fid
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function getValue(param: any){
      store.commit('user/setSettingValue', {
        ...param
      })
    }

    return {
      isShow,
      dataList,
      setting,
      module,
      init,
      getValue
    }
  }
})
</script>

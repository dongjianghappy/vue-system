<template>
<v-button v-model:show="isShow" :disabled="auth">
  频道
</v-button>
<v-drawer v-model:show="isShow" :title="name" :style="{width: '400'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    <AddChannel :data="{fid: data.fid, coding: data.coding.channel}" :render="init" />
  </template>
  <template v-slot:content>
    <v-collapse :title="item.name" v-for="(item, index) in dataList" :key="index">
      <template v-slot:extra_left>
        <AddChannel :data="{id: item.id, coding: data.coding.channel}" action="edit" :render="init" />
      </template>
      <template v-slot:extra>
        <AddPage :data="{fid: item.id, coding: data.coding.page}" :render="init" />
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.name}}
            <AddPage :data="{id: item.id, coding: data.coding.page}" action="edit" :render="init" />
          </span>
        </li>
      </ul>
    </v-collapse>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  useStore
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
    name: {
      type: String,
      default: "网站"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
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

    return {
      isShow,
      dataList,
      setting,
      init
    }
  }
})
</script>

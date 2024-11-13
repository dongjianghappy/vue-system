<template>
<span @click="() => isShow =true">
  {{data.name}}
</span>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="tabsMood" :isEmit="true" v-model:index="index">
      <template v-slot:extra>
        <Detail :data="{fid: data.id, coding: coding.mood.system}" :render="init" />
      </template>
      <template v-slot:content1>
        <div v-for="(item, index) in dataList" :key="index">
          {{item.content}}
          <span class="right">
            <Detail action="edit" :data="{id: item.id, coding: coding.mood.system}" :render="init" /></span>
        </div>
      </template>
      <template v-slot:content2>
        <div v-for="(item, index) in userMoodList" :key="index">
          {{item.mood}}
          <span class="right">
            {{item.times}}
          </span>
        </div>

      </template>
    </v-tabs>
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
  tabsMood
} from '@/assets/const'
import Detail from './components/detail.vue'
import SpaceModal from '../../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    SpaceModal,
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
    const coding: any = codings
    const store = useStore();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})
    const dataList: any = ref([])
    const userMoodList: any = ref([])
    const index: any = ref(0)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding.mood.system,
          fid: props.data.id
        }
      }).then(res => {
        dataList.value = res.result
      })

      store.dispatch('common/Fetch', {
        data: {
          coding: coding.user.mood,
          fid: props.data.id
        }
      }).then(res => {
        userMoodList.value = res.result
      })
    }

    return {
      coding,
      isShow,
      detail,
      drawer,
      tabsMood,
      dataList,
      userMoodList,
      init
    }
  }
})
</script>

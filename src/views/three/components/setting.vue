<template>
<v-button v-model:show="isShow" :disabled="false">
  场景信息
</v-button>
<v-drawer v-model:show="isShow" :title="`${title}场景信息`" :style="{width: '600'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    <SettingType action="add" :data="{coding: coding}" />
  </template>
  <template v-slot:content>
    <v-tabs :tabs="tabsThree" v-model:value="currentValue" :isEmit="true">
      <template v-slot:extra>

      </template>
      <template v-slot:content1>
        <BasicList :data="{...data, coding}" />
      </template>
      <template v-slot:content2>
        <RoadLine :data="data" />
      </template>
      <template v-slot:content3>
       
      </template>
      <template v-slot:content4>
        
      </template>

      <template v-slot:content5>
       
      </template>
    </v-tabs>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  codings,
  useStore
} from '@/utils'
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  computed
} from '@/utils'
import {
  tabsThree
} from '@/assets/const'
import SettingType from './settingType.vue'
import BasicList from './baisc/index.vue'
import RoadLine from './roadLine/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    SettingType,
    BasicList,
    RoadLine
  },
  props: {
    title: {
      type: String,
      default: '所有星球'
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
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore()
    const coding = codings.three

    const isShow: any = ref(false)
    const currentValue: any = ref("manage")
    const dataList: any = ref([])
    const setting = computed(() => store.getters['user/setting']);
    const form: any = ref({
      pagesize: ''
    })
    

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {

      }
    })

    return {
      coding,
      isShow,
      currentValue,
      dataList,
      setting,
      module,
      tabsThree,
      form
    }
  }
})
</script>

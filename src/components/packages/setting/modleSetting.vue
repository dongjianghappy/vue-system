<template>
<v-tabs :tabs="[{name: '页面模块',value: 'basic'}, {name: '页面链接',value: 'photos'}]" :isEmit="true">
  <template v-slot:content1>
    <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.type == '0')" :key="index">
      <template v-slot:extra_left>
        <SettingType action="edit" :data="{id: item.id}" :website="website" />
      </template>
      <template v-slot:extra>
        <AddSetting action="add" :data="{fid: item.id, coding: data.coding.setting}" />
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.name}}
            <AddSetting :data="{id: item.id, coding: data.coding.setting}" :render="init" action="edit" />
          </span>
          <v-switch :data="{ item, field: 'status', coding: coding }" @toggle="getValue" className="right" :auth="true" />
        </li>
      </ul>
    </v-collapse>
  </template>
  <template v-slot:content2>
    <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.type == '1')" :key="index">
      <template v-slot:extra_left>
        <SettingType action="edit" :data="{id: item.id}" :website="website" />
      </template>
      <template v-slot:extra>
        <AddSetting action="add" :data="{fid: item.id, coding: data.coding.setting}" />
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.name}}
            <AddSetting :data="{id: item.id, coding: data.coding.setting}" :render="init" action="edit" />
          </span>
          <v-switch :data="{ item, field: 'status', coding: coding }" @toggle="getValue" className="right" :auth="true" />
        </li>
      </ul>
    </v-collapse>
  </template>
</v-tabs>
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
  tabsSetting
} from '@/assets/const'
import SettingType from './addSiteModule.vue'
import AddSetting from './addSiteSetting.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    SettingType,
    AddSetting
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    website: {
      type: Object,
      default: []
    },    
    dataList: {
      type: Array,
      default: []
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
    const coding = codings.channel_config

    const isShow: any = ref(false)
    const currentValue: any = ref("manage")
    const setting = computed(() => store.getters['user/setting']);
    const form: any = ref({
      pagesize: ''
    })

    return {
      isShow,
      coding,
      currentValue,
      setting,
      module,
      tabsSetting,
      form
    }
  }
})
</script>

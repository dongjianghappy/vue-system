<template>
<v-tabs :tabs="[{name: '基本设置',value: 'basic'}, {name: '消息设置',value: 'photos'}, {name: '隐私设置',value: 'background'}]" :isEmit="true">
  <template v-slot:content1>
    <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.sub == 'basic')" :key="index">
      <template v-slot:extra_left>
        <SettingType action="edit" :data="{id: item.id, coding: data.coding.setting_type}" />
      </template>
      <template v-slot:extra>
        <AddSetting action="add" :data="{fid: item.id, coding: data.coding.setting}" />
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.remark}}
            <AddSetting :data="{id: item.id, coding: data.coding.setting}" :render="init" action="edit" />
          </span>
          <v-switch :data="{ item, field: 'value', coding: data.coding.setting }" @toggle="getValue" className="right" :auth="true" />
        </li>
      </ul>
    </v-collapse>
  </template>
  <template v-slot:content2>
    <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.sub == 'message')" :key="index">
      <template v-slot:extra_left>
        <SettingType action="edit" :data="{id: item.id, coding: data.coding.setting_type}" />
      </template>
      <template v-slot:extra>
        <AddSetting action="add" :data="{fid: item.id, coding: data.coding.setting}" />
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.remark}}
            <AddSetting :data="{id: item.id, coding: data.coding.setting}" :render="init" action="edit" />
          </span>
          <v-switch :data="{ item, field: 'value', coding: data.coding.setting }" @toggle="getValue" className="right" :auth="true" />
        </li>
      </ul>
    </v-collapse>
  </template>
  <template v-slot:content3>
    <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.sub == 'privacy')" :key="index">
      <template v-slot:extra_left>
        <SettingType action="edit" :data="{id: item.id, coding: data.coding.setting_type}" />
      </template>
      <template v-slot:extra>
        <AddSetting action="add" :data="{fid: item.id, coding: data.coding.setting}" />
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.remark}}
            <AddSetting :data="{id: item.id, coding: data.coding.setting}" :render="init" action="edit" />
          </span>
          <v-switch :data="{ item, field: 'value', coding: data.coding.setting }" @toggle="getValue" className="right" :auth="true" />
        </li>
      </ul>
    </v-collapse>
  </template>
</v-tabs>
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
import {
  tabsSetting
} from '@/assets/const'
import SettingType from './settingType.vue'
import AddSetting from './addSetting.vue'
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

    const isShow: any = ref(false)
    const currentValue: any = ref("manage")
    const setting = computed(() => store.getters['user/setting']);
    const form: any = ref({
      pagesize: ''
    })

    return {
      isShow,
      currentValue,
      setting,
      module,
      tabsSetting,
      form
    }
  }
})
</script>

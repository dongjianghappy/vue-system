<template>
<v-button v-model:show="isShow" :disabled="auth">
  设置
</v-button>
<v-drawer v-model:show="isShow" title="用户设置" :style="{width: '400'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    <SettingType action="add" :data="{coding: data.coding.setting_type}" :render="init" />
  </template>
  <template v-slot:content>
    <v-collapse :title="item.name" v-for="(item, index) in dataList" :key="index">
      <template v-slot:extra>
        <SettingType action="edit" :data="{id: item.id, coding: data.coding.setting_type}" :render="init" />
        <AddSetting action="add" :data="{fid: item.id, coding: data.coding.setting}" :render="init" />
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
        api: "systemSetting",
        data: {
          type: 'user'
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function getValue(param: any) {
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

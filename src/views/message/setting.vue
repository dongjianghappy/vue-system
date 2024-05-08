<template>
<div class="module-wrap ml15">
  <div class="module-head">
    消息设置
    <span class="right">
      <SettingType :data="{coding: coding.type}" :render="init" /></span>
  </div>
  <div class="module-content plr15" style="height: 545px; overflow-y: auto;">
    <v-collapse :title="item.name" v-for="(item, index) in dataList" :key="index">
      <template v-slot:extra_left>
        <SettingType action="edit" :data="{id: item.id, coding: coding.type}" />
      </template>
      <template v-slot:extra>
        <Detail action="add" :data="{fid: item.id, coding: coding.setting}" />
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.remark}}
            <Detail :data="{id: item.id, coding: coding.setting}" :render="init" action="edit" />
          </span>
          <v-switch :data="{ item, field: 'value', coding: coding.setting }" @toggle="getValue" className="right" :auth="true" />
        </li>
      </ul>
    </v-collapse>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore,
  codings
} from '@/utils'
import SettingType from "./components/settingType.vue"
import Detail from "./components/detail.vue"
export default defineComponent({
  name: 'v-Search',
  components: {
    SettingType,
    Detail
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const coding: any = codings.message
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: "messageSetting",
      }).then(res => {
        dataList.value = res.result
      })
    }

    onMounted(init)
    return {
      coding,
      dataList,
      init
    }
  }
})
</script>

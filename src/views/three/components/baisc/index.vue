<template>
<v-collapse :title="item.name" v-for="(item, index) in dataList" :key="index">
      <template v-slot:extra_left>
        <SettingType action="edit" :data="{id: item.id, coding: data.coding}" :render="init" />
      </template>
      <template v-slot:extra>
        <BasicName :data="{fid: item.id, coding: data.coding}" :render="init" v-if="item.isgroup === '1'" />
        <BasicDetail action="add" :data="{fid: item.id, coding: data.coding.config}" :render="init" v-else />
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(list, i) in item.list" :key="i">
          <template v-if="list.isName">
            <span>
              {{list.name}}
              <BasicName action="edit" :data="{id: list.id, coding: data.coding}" :render="init" />
            </span>
            <span class="right" @click="handleClick(list)">展开</span>
            <span class="right"><BasicDetail action="add" :data="{fid: list.id, coding: data.coding.config}" :render="init" /></span>
            <div v-if="list.isextend">
              <div class="flex p15" style="background: #f8f8fa;" v-for="(detail, j) in list.list" :key="j">
                <div style="width: 100px">
                {{detail.remark}}
                <BasicDetail action="edit" :data="{id: detail.id, coding: data.coding.config}" :render="init" />
                </div>
                <div style="flex: 1" class="flex">
                  <input type="text" v-model="detail.value" class="input-sm input-full" @blur="save(detail)">
                  <span style="width: 50px">{{detail.unit}}</span>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <span class="label">
              {{list.remark}}
              <BasicDetail action="edit" :data="{id: list.id, coding: data.coding.config}" :render="init" />
            </span>
            <div class="flex">
            <input type="text" v-model="list.value" class="input-sm input-full" @blur="save(list)">
            <span style="width: 50px">{{list.unit}}</span>
            </div>
          </template>
        </li>
      </ul>
    </v-collapse>
</template>

<script lang="ts">
import {
  onMounted,
  useStore
} from '@/utils'
import {
  defineComponent,
  ref,
  computed
} from '@/utils'
import {
  tabsSetting
} from '@/assets/const'
import SettingType from '../settingType.vue'
import BasicName from './name.vue'
import BasicDetail from './detail.vue'
import Template from '@/views/talk/journal/components/template.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    SettingType,
    BasicName,
    BasicDetail,
    Template
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
  setup(props, context) {
    const store = useStore()

    const isShow: any = ref(false)
    const currentValue: any = ref("manage")
    const setting = computed(() => store.getters['user/setting']);
    const dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'threeSetting',
        data: {
          scene: props.data.id || 0
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function handleClick(param: any){
      param.isextend = !param.isextend
      
    }

    function save(param: any) {
      const params: any = {}
      
      params[param.name] = param.value
      store.dispatch('common/Fetch', {
        api: 'updateInfo',
        data: {
          coding: props.data.coding.config,
          ...params
        }
      })
    }    

    onMounted(() => {
      init()
    })

    return {
      isShow,
      currentValue,
      setting,
      module,
      tabsSetting,
      dataList,
      init,
      handleClick,
      save
    }
  }
})
</script>

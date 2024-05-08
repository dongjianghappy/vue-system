<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-shezhi pointer"></i>
</v-button>
<v-drawer v-model:show="isShow" title="系统设置" :style="{width: '600'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    <SettingType action="add" :data="{coding: data.coding.setting_type}" />
  </template>
  <template v-slot:content>
    <v-tabs :tabs="tabsSetting" v-model:value="currentValue" :isEmit="true">
      <template v-slot:extra>

      </template>
      <template v-slot:content1>
        <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.type == currentValue)" :key="index">
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
        <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.type == currentValue)" :key="index">
          <template v-slot:extra_left>
            <SettingType action="edit" :data="{id: item.id, coding: data.coding.setting_type}" />
          </template>
          <template v-slot:extra>
            <AddSetting action="add" :data="{fid: item.id, coding: data.coding.setting}" />
          </template>
          <ul class="form-wrap-box">
            <template v-for="(list, i) in item.list" :key="i">
              <li class="li" v-if="list.text_type != 'switch'">
                <div class="label">
                  {{list.remark}}
                  <AddSetting :data="{id: list.id, coding: data.coding.setting}" :render="init" action="edit" />
                </div>
                <input type="text" v-model="form[list.name]" class="input-sm input-full" @blur="save($event, list.name)" v-if="list.text_type === 'input'">
                <v-checkboxgroup :tagList="menus[list.name]" :checked="form[list.name]" @save="save($event, list.name)" :isEmit="true" v-else-if="list.text_type === 'checkbox'" />
                <v-select :enums="menus[list.name]" v-model:value="form[list.name]" :defaultValue="form[list.name] = form[list.name] ? form[list.name] : 'all'" v-else-if="list.text_type === 'select'" />
              </li>
              <li class="li mb15" v-else>
                <span class="label">
                  {{list.remark}}
                  <AddSetting :data="{id: list.id, coding: data.coding.setting}" :render="init" action="edit" />
                </span>
                <v-switch :data="{ item: list, field: 'value', coding: data.coding.setting }" @toggle="getValue" className="right" :auth="true" />
              </li>
            </template>
          </ul>
        </v-collapse>
      </template>
      <template v-slot:content3>
        <UserSetting :data="{coding: data.coding}" :dataList="dataList.filter(item => item.type == currentValue)" />
        <!-- <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.type == currentValue)" :key="index">
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
        </v-collapse> -->
      </template>
      <template v-slot:content4>
        <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.type == currentValue)" :key="index">
          <template v-slot:extra_left>
            <SettingType action="edit" :data="{id: item.id, coding: data.coding.setting_type}" />
          </template>
          <template v-slot:extra>
            <AddSetting action="add" :data="{fid: item.id, coding: data.coding.setting}" />
          </template>
          <ul class="form-wrap-box">
            <template v-for="(list, i) in item.list" :key="i">
              <li class="li" v-if="list.text_type != 'switch'">
                <!-- {{menus[list.name]}} -->
                <div class="label">{{list.remark}}</div>
                <input type="text" v-model="form[list.name]" class="input-sm input-full" v-if="list.text_type === 'input'">
                <v-checkboxgroup :tagList="menus[list.name]" :checked="form[list.name]" @save="save($event, list.name)" :isEmit="true" v-else-if="list.text_type === 'checkbox'" />
                <v-select :enums="menus[list.name]" v-model:value="form[list.name]" :defaultValue="form[list.name] = form[list.name] ? form[list.name] : 'all'" v-else-if="list.text_type === 'select'" />
              </li>
              <li class="li mb15" v-else>
                <span class="label">
                  {{list.remark}}
                  <AddSetting :data="{id: list.id, coding: data.coding.setting}" :render="init" action="edit" />
                </span>
                <v-switch :data="{ item: list, field: 'value', coding: data.coding.setting }" @toggle="getValue" className="right" :auth="true" />
              </li>
            </template>
          </ul>
        </v-collapse>
      </template>

      <template v-slot:content5>
        <v-collapse :title="item.name" v-for="(item, index) in dataList.filter(item => item.type == currentValue)" :key="index">
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
              <v-switch :data="{ item, field: 'status', coding: data.coding.setting }" @toggle="getValue" className="right" :auth="true" />
            </li>
          </ul>
        </v-collapse>
      </template>
    </v-tabs>
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
import {
  tabsSetting
} from '@/assets/const'
import SettingType from './settingType.vue'
import AddSetting from './addSetting.vue'
import UserSetting from './userSetting.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    SettingType,
    AddSetting,
    UserSetting
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
    const currentValue: any = ref("manage")
    const dataList: any = ref([])
    const setting = computed(() => store.getters['user/setting']);
    const form: any = ref({
      pagesize: ''
    })
    const menus: any = computed(() => {

      const ssss: any = {
        field: [{
            name: 'title',
            value: '标题',
            tag: 'title'
          },
          {
            name: 'description',
            value: '描述',
            tag: 'description'
          },
          {
            name: 'content',
            value: '内容',
            tag: 'content'
          }
        ],
        condition: [{
          name: 'source',
          value: '审核通过',
          tag: 'checked'
        }],
        time: [{
            value: 'all',
            name: '全部时间',
          },
          {
            value: 'day',
            name: '最近一天',
          },
          {
            value: 'week',
            name: '最近一周',
          },
          {
            value: 'month',
            name: '最近一月',
          },
          {
            value: 'year',
            name: '最近一年',
          }
        ],
      }

      let aaa = store.getters['user/channel']
      let arr: any = [{
        name: 'member_talk',
        value: '朋友圈',
        tag: 'member_talk'
      }]
      aaa.forEach((item: any) => {
        debugger
        arr.push({
          name: item.module,
          value: item.name,
          tag: item.module
        })
      })
      ssss.channel = arr
      return ssss
    });

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "systemSetting"
      }).then(res => {
        dataList.value = res.result

        dataList.value.map((item: any) => {
          item.list.map((list: any) => {

            if (list.text_type != 'switch') {
              if (list.text_type === 'checkbox') {
                let arr = list.value.split(',')
                form.value[list.name] = list.value ? arr : []
              } else {
                form.value[list.name] = list.value
              }
            }
          })

        })
      })
    }

    function getValue(param: any) {
      store.commit('user/setSettingValue', {
        ...param
      })
    }

    function save(param: any, name: any) {
      const params: any = {}
      if (menus.value[name] === undefined) {
        params[name] = param.currentTarget.value
        debugger
      } else {
        let value: any = []
        menus.value[name].forEach((item: any) => {
          if (param.indexOf(item.name) > -1) {
            value.push(item.name)
          }
        })

        params[name] = value.join(',')
      }

      store.dispatch('common/Fetch', {
        api: 'updateInfo',
        data: {
          coding: "U0680015",
          ...params
        }
      }).then(res => {
        debugger
      })
    }

    return {
      isShow,
      currentValue,
      dataList,
      setting,
      module,
      init,
      getValue,
      tabsSetting,
      form,
      menus,
      save
    }
  }
})
</script>

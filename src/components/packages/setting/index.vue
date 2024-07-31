<template>
<v-button v-model:show="isShow" :disabled="auth">
  站点设置
</v-button>
<v-drawer v-model:show="isShow" title="站点设置" :style="{width: '600'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    <SettingType action="add" :data="{coding: data.coding.setting_type}" :website="data.website" />
  </template>
  <template v-slot:content>
    <v-tabs :tabs="data.website" v-model:value="currentValue" :isEmit="true">
      <template v-slot:extra>

      </template>
      <template v-slot:[`content${index+1}`] v-for="(item, index) in data.website" :key="index">
        <ModleSetting :data="{coding: data.coding}" :dataList="dataList.filter(item => item.website_id == index+1)" :website="data.website" />  
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
import SettingType from './addSiteModule.vue'
import AddSetting from './addSetting.vue'
import ModleSetting from './modleSetting.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    SettingType,
    AddSetting,
    ModleSetting
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
        api: "channelSetting"
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

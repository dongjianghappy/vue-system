<template>
<v-tabs :tabs='[{
        name: "模块设置",
        value: "appstore1"
      },
      {
        name: "链接设置",
        value: "appstore2"
      },
      {
        name: "功能设置",
        value: "appstore2"
      }
    ]' method="click">
        <template v-slot:extra>

        </template>
        <template v-slot:content1>
          <div class="bg-white mb15" v-for="(item, index) in dataList && dataList.filter((data) => data.type === '0')" :key="index">
            <div class="ptb15" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgb(240, 240, 240);">
              <div style="display: flex; height: 32px; line-height: 32px;">
                <div class="mr15" style="display: flex; padding-top: 7px;">
                  <span class="deg90" :class="{'deg360': item.extand}" @click="handelExpand(item)">
                    <i class="iconfont icon-arrow arrow"></i>
                  </span>
                  {{item.name}}
                </div>
              </div>
            </div>
            <div>
              <ul class="align_left" style="padding-left: 30px;">
                <li class="li mb15" :class="{'extand': item.extand}" v-for="(list, i) in item.list" :key="i">
                  <span class="label">
                    {{list.name}}
                  </span>
                  <v-switch :data="{ item: list, field: 'authority', ...data }" :param="{uid: uid, field: list.value, channel_id: channel_id}" api="setUserAuthority" :msg="message" className="right" :auth="true" />
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-slot:content2>
          <div class="bg-white mb15" v-for="(item, index) in dataList && dataList.filter((data) => data.type === '1')" :key="index">
            <div class="ptb15" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgb(240, 240, 240);">
              <div style="display: flex; height: 32px; line-height: 32px;">
                <div class="mr15" style="display: flex; padding-top: 7px;">
                  <span class="deg90" :class="{'deg360': item.extand}" @click="handelExpand(item)">
                    <i class="iconfont icon-arrow arrow"></i>
                  </span>
                  {{item.name}}
                </div>
              </div>
            </div>
            <div>
              <ul class="align_left" style="padding-left: 30px;">
                <li class="li mb15" :class="{'extand': item.extand}" v-for="(list, i) in item.list" :key="i">
                  <span class="label">
                    {{list.name}}
                  </span>
                  <v-switch :data="{ item: list, field: 'authority', ...data }" :param="{uid: uid, field: list.value, channel_id: channel_id}" api="setUserAuthority" :msg="message" className="right" :auth="true" />
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-slot:content3>
          <div class="bg-white mb15" v-for="(item, index) in dataList && dataList.filter((data) => data.type === '2')" :key="index">
            <div class="ptb15" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgb(240, 240, 240);">
              <div style="display: flex; height: 32px; line-height: 32px;">
                <div class="mr15" style="display: flex; padding-top: 7px;">
                  <span class="deg90" :class="{'deg360': item.extand}" @click="handelExpand(item)">
                    <i class="iconfont icon-arrow arrow"></i>
                  </span>
                  {{item.name}}
                </div>
              </div>
            </div>
            <div>
              <ul class="align_left" style="padding-left: 30px;">
                <li class="li mb15" :class="{'extand': item.extand}" v-for="(list, i) in item.list" :key="i">
                  <span class="label">
                    {{list.name}}
                    <i class="iconfont icon-ban cl-red" v-if="list.ban === '1'" />
                  </span>
                  <v-switch :data="{ item: list, field: 'authority', ...data }" :param="{uid: uid, field: list.value, channel_id: channel_id}" api="setUserAuthority" :msg="message" className="right" :auth="true" />
                </li>
              </ul>
            </div>
          </div>
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
  watch
} from 'vue'
import {
  Drawer
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    uid: {
      type: String,
      default: ""
    },
       channel: {
      type: Object,
      default: []
    },
    dataList: {
      type: Object,
      default: () => {
        return []
      }
    },
    channel_id: {
      type: String,
      default: ""
    },
    setRoute: {
      type: Function,
      default: () => {
        return
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
      proxy
    }: any = getCurrentInstance();
    const store = useStore()

    const isShow: any = ref(false)
    const moduleList: any = ref([])
    const linkList: any = ref([])
    const functionList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: 'talkSetting',
        data: {
          coding: 'U50002',
          ...props.data
        }
      }).then(res => {
        moduleList.value = res.result.list.filter((item: any) => item.type === "0")
        linkList.value = res.result.list.filter((item: any) => item.type === "1")
        functionList.value = res.result.list.filter((item: any) => item.type === "2")
      })
    }

    function handelExpand(param: any) {
      param.extand = !param.extand
    }

       function message(message: any) {
      proxy.$hlj.message({
        msg: message
      })
    }

    return {
      isShow,
      moduleList,
      linkList,
      functionList,
      module,
      init,
      handelExpand,
      message
    }
  }
})
</script>

<style scoped>
.deg360 {
  transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  /* IE 9 */
  -moz-transform: rotate(360deg);
  /* Firefox */
  -webkit-transform: rotate(360deg);
  /* Safari 和 Chrome */
  -o-transform: rotate(360deg);
  /* Opera */
}

.extand {
  display: none;
}
</style>

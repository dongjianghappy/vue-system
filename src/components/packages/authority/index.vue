<template>
<v-button v-model:show="isShow" :disabled="auth">
  {{name}}
</v-button>
<v-drawer v-model:show="isShow" :title="title" :top="64" :hasfooter="false" :auth="auth">
  <template v-slot:extra v-if="type==='manage'">
    <v-space>
      <AddPage :data="data" :render="init" :channel="channelMenu" />
    </v-space>
  </template>
  <template v-slot:content>

    <v-tabs :tabs='[{
        name: "频道管理"
      },
      {
        name: "应用管理"
      },
      {
        name: "功能管理"
      }
    ]' v-model:index="indexsss" :isEmit="true" :extra="false">
      <template v-slot:content1>
        <div class="aside-wrap" style="min-height: 650px">
          <div class="aside-nav p0 pt10" style="width: 80px">
            <!-- 频道列表 -->
            <div class="aside-list pointer pr0" :class="[{current: currentIndex === index}]" v-for="(item, index) in channelList" :key="index" @click="handleClick(index)">
              <i class="iconfont" :class="`icon-${icon}`" v-if="icon" />
              {{item.name}}
              <i class="iconfont icon-permissions" v-if="item.grade === '0'" />
            </div>
          </div>
          <div class="aside-content">
            <List v-for="(item, index) in channelList" :key="index" :dataList="item.list" :channel_id="item.grade_id" v-show="currentIndex === index" :channel="channelMenu" :data="data" :type="type" :render="init"></List>
          </div>
        </div>
      </template>
      <template v-slot:content2>
        <ApplicationList :dataList="applicationList" :data="{...data, coding: 'P0010'}" :type="type" />
      </template>
      <template v-slot:content3>
        <ApplicationList :dataList="functionList" :data="{...data, coding: 'P0010',}" :type="type" />
      </template>
    </v-tabs>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore
} from '@/utils'
import List from './list.vue'
import ApplicationList from './applicationList.vue'
import FunctionList from './functionList.vue'
import AddPage from './addPage.vue'
import AddModule from './addModule.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    AddPage,
    AddModule,
    List,
    ApplicationList,
    FunctionList
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
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
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    let currentIndex = ref(0)
    const isShow: any = ref(false)
    const channelMenu: any = ref([])
    const channelList: any = ref([])
    const applicationList: any = ref([])
    const functionList: any = ref([])
    const moduleList: any = ref([])
    const linkList: any = ref([])
    const indexsss: any = ref(0)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function init() {
      channelMenu.value = []
      store.dispatch('common/Fetch', {
        api: props.type === 'manage' ? 'talkSetting' : 'userAuthority',
        data: {
          ...props.data
        }
      }).then(res => {
        applicationList.value = res.result.application
        functionList.value = res.result.function
        channelList.value = res.result.channel
        res.result.channel.map((item: any) => {
          channelMenu.value.push({
            value: item.id,
            name: item.name
          })
        })
      })
    }

    function handleClick(index: any) {
      currentIndex.value = index
    }

    return {
      isShow,
      currentIndex,
      channelList,
      channelMenu,
      moduleList,
      linkList,
      applicationList,
      functionList,
      handleClick,
      module,
      init,
      indexsss
    }
  }
})
</script>

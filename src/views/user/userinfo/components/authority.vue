<template>
<v-button v-model:show="isShow" :disabled="auth">
  用户权限
</v-button>
<Drawer v-model:show="isShow" title="页面板块" :top="64" width="400" :auth="auth">
  <template v-slot:extra>
    <v-space>
      <span @click="handelBuild">
        <i class="iconfont icon-refresh"></i>更新配置
      </span>
      <AddButton :data="data" :render="init" :channel="channelMenu" />
    </v-space>
  </template>

  <template v-slot:content>
    <div class="channel-box">

      <div class="aside-wrap" style="min-height: 650px">

        <div class="aside-nav p10" :class="{p0: title}" style="margin-left: -30px; width: 80px">
          <div v-if="title" class="aside-list align_center" style="border-bottom: 1px solid #eee; height: 63px; line-height: 63px;">
            <h3>{{title}}</h3>
          </div>
          <div class="aside-list pointer" :class="[{plr15: title}, {current: currentIndex === index}]" v-for="(item, index) in channelList" :key="index" @click="handleClick(index)">
            <i class="iconfont" :class="`icon-${icon}`" v-if="icon" />
            {{item.name}}
          </div>
        </div>
        <div class="aside-content">
          <List v-for="(item, index) in channelList" :key="index" :dataList="item.list" :channel_id="item.grade_id" v-show="currentIndex === index" :channel="channelMenu" :data="data" :uid="uid"></List>
        </div>
      </div>

    </div>

  </template>
</Drawer>
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
import List from './authorityList.vue'
import {
  Drawer
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer,
    List
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
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
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
    let currentIndex = ref(0)

    const isShow: any = ref(false)
    const channelMenu: any = ref([])
    const channelList: any = ref([])
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
      channelMenu.value = []
      store.dispatch('common/Fetch', {
        api: 'userAuthority',
        data: {
          coding: 'U50002',
          uid: props.uid,
          ...props.data
        }
      }).then(res => {

        channelList.value = res.result
        res.result.map((item: any) => {
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
      functionList,
      handleClick,
      module,
      init
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

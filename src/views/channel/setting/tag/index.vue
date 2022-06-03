<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-write"></i>
</v-button>

<Drawer ref="drawer" v-model:show="isShow" :action="action" title="聚合标签" :width="1000" api="getFlag" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="menu" v-model:index="index" :isEmit="true">

      <template v-slot:extra>
        <Detail :data="data" :render="init" />
      </template>
      <template v-slot:content1>
        <List :coding="{coding: '131'}" :dataList="dataList" :data="{ coding: 'O0002' }" />
      </template>
      <template v-slot:content2>
        <List :coding="{coding: '131'}" :dataList="dataList" :data="{ coding: 'O0002' }" />
      </template>
      <template v-slot:content3>
        <List :coding="{coding: '131'}" :dataList="dataList" :data="{ coding: 'O0002' }" />
      </template>
    </v-tabs>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  NAV_TYPE,
} from '@/assets/enum'
import {
  Drawer
} from '@/components/packages/index'
import List from "./components/list.vue"
import Detail from "./components/detail.vue"
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer,
    List,
    Detail
  },
  props: {
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
    action: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    checkboxList: {
      type: Array,
      default: []
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const navType: any = NAV_TYPE
    const store = useStore();
    const aaa: any = ref([])
    const dataList: any = ref([])
    const index: any = ref("0")

    let menu: any = ref([{
        name: "公共标签",
        value: "appstore1"
      }, {
        name: "导航标签",
        value: "appstore1"
      },
      {
        name: "分类标签",
        value: "appstore2"
      },
      {
        name: "文档标签",
        value: "appstore2"
      }
    ])
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        dataList.value = await drawer.value.init({
          channel_id: props.data.channel_id,
          type: 'art'
        })
      }
    })
    // 监听
    watch([index], async (newValues, prevValues) => {
      debugger
      dataList.value = await drawer.value.init({
        channel_id: index.value === 0 ? 0 : props.data.channel_id, // 公共标签频道id值为0
        type: index.value === 0 ? '' : index.value === 1 ? "nav" : index.value === 2 ? "cat" : "art" // 公共标签类型为空
      })
    })

    return {
      isShow,
      index,
      detail,
      dataList,
      drawer,
      menu,
      navType,
      aaa
    }
  }
})
</script>

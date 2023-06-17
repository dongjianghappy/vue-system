<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-write"></i>
</v-button>

<v-drawer ref="drawer" v-model:show="isShow" action="edit" title="聚合标签" :width="1000" api="getFlag" :data="data" :hasfooter="false" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="menu" v-model:index="index" :isEmit="true">
      <template v-slot:extra>
        <Detail :data="data" :render="init" />
      </template>
      <template v-slot:content1>
        <List :coding="{coding: '131'}" :dataList="dataList" :data="{ coding: data.coding }" />
      </template>
      <template v-slot:content2>
        <List :coding="{coding: '131'}" :dataList="dataList" :data="{ coding: data.coding }" />
      </template>
      <template v-slot:content3>
        <List :coding="{coding: '131'}" :dataList="dataList" :data="{ coding: data.coding }" />
      </template>
    </v-tabs>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@/utils'
import List from "./components/list.vue"
import Detail from "./components/detail.vue"
export default defineComponent({
  name: 'v-Search',
  components: {
    List,
    Detail
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
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const dataList: any = ref([])
    const index: any = ref("0")
    const detail: any = ref({})

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
    }
  }
})
</script>

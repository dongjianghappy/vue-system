<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="menu" type="vertical">
    <div class="module-head">
      <v-optionsbar title="主题风格">
        <template v-slot:extraright>

        </template>
      </v-optionsbar>
    </div>
    <template v-slot:content1>
      <Info :render="init" :coding="coding" :type='page.value' :dataList="dataList" />
    </template>
        <template v-slot:content2>
      <Set :render="init" :coding="coding" :type='page.value' :dataList="dataList" />
    </template>
        <template v-slot:content3>
      <Tag :render="init" :coding="coding" :type='page.value' :dataList="dataList" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  useRoute,
} from '@/utils'
import {
  useStore
} from 'vuex'
import Info from './components/info.vue'
import Set from './components/set.vue'
import Tag from './tag/index.vue'

import {
  linkPage
} from '@/assets/const'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Info,
    Set,
    Tag

  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = proxy.$coding['link'];
    const query: any = ref(route.query)
    const dataList: any = ref([])
    let menu: any = ref([{
        name: "频道信息",
        value: "appstore1"
      },
      {
        name: "频道设置",
        value: "appstore2"
      },
      {
        name: "聚合标签",
        value: "appstore2"
      }
    ])
    let page: any = ref(linkPage[0])

    // 监听路由
    watch(route, (newValues, prevValues) => {
      let qq: any = route.query
      page.value = linkPage[qq.type]
    })

    
    return {
      coding,
      menu,
      page,
      
      dataList
    }
  }
})
</script>

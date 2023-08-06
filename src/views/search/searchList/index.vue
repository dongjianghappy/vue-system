<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:content1>
      <List :render="init" :coding="coding" :dataList="dataList" />
    </template>
    <template v-slot:content2>
      <List2 :render="init" :coding="coding" :dataList="dataList" />
    </template>
    <template v-slot:content3>
      <Calendar />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  watch,
  useRoute,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import Calendar from "./components/calendar.vue"

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    List2,
    Calendar
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings
    const store = useStore();
    const route = useRoute();
    
    let menu: any = ref([{
        name: "搜索明细",
        value: "advertisement2"
      },
      {
        name: "每日概况",
        value: "advertisement3"
      },
      {
        name: "日期查看",
        value: "advertisement3"
      }
    ])
    


    return {
      menu
    }
  }
})
</script>

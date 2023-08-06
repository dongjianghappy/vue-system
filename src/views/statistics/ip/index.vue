<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu" url="/admin/statistics/domain">
  <template v-slot:content1>
      <List :render="init" :coding="coding" />
    </template>
    <template v-slot:content2>
      <List3 :render="init" :coding="coding" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@/utils'
import {
  visitPage
} from '@/assets/const'
import List from "./components/list.vue"
import Calendar from "./components/calendar.vue"
import List3 from "./components/list3.vue"
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List,
    Calendar,
    List3
  },
  setup(props, context) {
    let menu: any = ref([{
        name: "每日IP",
        value: "appstore1"
      },
      {
        name: "IP库",
        value: "appstore3"
      }
    ])

    return {
      menu
    }
  }
})
</script>

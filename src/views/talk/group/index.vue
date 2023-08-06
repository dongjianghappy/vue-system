<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsGroup" type="vertical">
    <template v-slot:content1>
      <List1 :data="{coding: coding.talk.journal.cate}" :loading="loading" :siteEnum="siteEnum" />
    </template>
    <template v-slot:content2>
      <List1 :data="{coding: coding.talk.album.list}" :loading="loading" :siteEnum="siteEnum" />
    </template>
    <template v-slot:content3>
      <List1 :data="{coding: coding.talk.favorites.cate}" :loading="loading" />
    </template>
        <template v-slot:content4>
      <List1 :data="{coding: coding.notes.group}" :loading="loading" :siteEnum="siteEnum" />
    </template>
    <template v-slot:content5>
      <List1 :data="{coding: coding.picture.group}" :loading="loading" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  watch,
  ref,
  useRoute,
  useStore,
  codings,
} from '@/utils'

import List1 from './components/list1.vue'
import List2 from './components/list2.vue'
import List3 from './components/list3.vue'
import {
  tabsGroup
} from '@/assets/const'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    List1,
    List2,
    List3,
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings
    const loading: any = ref(false)
    const siteEnum: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0)



    return {
      tabsGroup,
      coding: coding,
      loading,
      siteEnum,
      auth: proxy.$auth.init('link')
    }
  }
})
</script>

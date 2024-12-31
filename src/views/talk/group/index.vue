<template>
<div class="module-wrap nobg">
  <v-tabs :tabs="tabsGroup" type="vertical">
    <template v-slot:content1>
      <List :data="{coding: coding.talk.journal.cate}" :loading="loading" :siteEnum="siteEnum" />
    </template>
    <template v-slot:content2>
      <List :data="{coding: coding.talk.album.list}" :loading="loading" :siteEnum="siteEnum" />
    </template>
    <template v-slot:content3>
      <List :data="{coding: coding.talk.favorites.cate}" :loading="loading" />
    </template>
        <template v-slot:content4>
      <List :data="{coding: coding.notes.group}" :loading="loading" :siteEnum="siteEnum" />
    </template>
    <template v-slot:content5>
      <List :data="{coding: coding.picture.group}" :loading="loading" />
    </template>
  </v-tabs>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  useRoute,
  useStore,
  codings,
} from '@/utils'

import List from './components/list.vue'
import {
  tabsGroup
} from '@/assets/const'

    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const coding: any = codings
    const loading: any = ref(false)
    const siteEnum: any = ref([])
    const tabsIndex: any = ref(route.query.type || 0)
    const auth: any = proxy.$auth.init('link')
</script>

<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="tabsBackground">
    <template v-slot:extra>
    </template>
    <template v-slot:content1>
      <HeadBackground />
    </template>
    <template v-slot:content2>
      <RelatedBackground />
    </template>
  </v-tabs>
</div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
  useStore,
  useRoute,
  useRouter,
  codings,
} from '@/utils'
import {
  tabsBackground
} from '@/assets/const'
import HeadBackground from './background/index.vue'
import RelatedBackground from './related_background/index.vue'
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const coding: any = codings.service.message_board;
    
    const tabsIndex: any = ref(route.query.type || 0) // tbs索引
    const dataList: any = ref([])

</script>

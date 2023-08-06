<template>
<div class="mb10 col-md-10" style="overflow: auto;">
  <div class="mb10" style="overflow: auto;">
    <Card :data="data" />
  </div>
  <div class="mb10" style="overflow: auto;">
    <div class="col-md-9" style=" padding-right: 8px;">
      <List :data="data.body" />
    </div>
    <div class="col-md-3" style="padding-left: 8px;">
      <Keyword :data="data.wordList" />
    </div>
  </div>
  <div class="mb10" style="overflow: auto;">
    <Article :data="data" :find="findList" />
  </div>
</div>
<div class="col-md-2" style="overflow: auto;">

  <div style="padding-left: 8px;">
    <Setting :data="{setting: data.setting, coding: coding.search.setting}" :render="init" />
  </div>
</div>  
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useStore,
  watch,
  codings
} from '@/utils'
import Card from "@/views/search/components/card.vue"
import List from "@/views/search/components/list.vue"
import Keyword from "@/views/search/components/keyword.vue"
import Article from "@/views/search/components/article.vue"
import Setting from "@/views/search/components/setting.vue"

import List2 from "@/views/search/components/list2.vue"
import AddSetting from "@/views/search/components/addSetting.vue"
import {
  ChartLine
} from '@/components/packages/chart/index'
import Authority from '@/components/packages/authority/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChartLine,
    Authority,
    Card,
    List,
    Keyword,
    Article,
    Setting,
    List2,
    AddSetting
  },
  setup(props, context) {
    const coding: any = codings.talk
    const store = useStore();

    const data: any = computed(() => store.getters['talk/searchDefault'] || {});
    const findList = computed(() => store.getters['talk/searchDefault'].find || []);
    // 初始化
    function init() {
      store.dispatch('talk/TalkdefaultSearch')
    }

    onMounted(init)
    return {
      coding,
      data,
      findList,
      init
    }
  }
})
</script>

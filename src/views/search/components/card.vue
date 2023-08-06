<template>
<div class="col-md-3" style="padding-right: 8px;">
  <div class="col-md-6">
    <v-statisticcard name="累计搜素111" :value="data.search_total || 0" />
  </div>
  <div class="col-md-6">
    <v-statisticcard name="关键词总量" :value="data.word_total || 0" />
  </div>
</div>
<div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
  <div class="col-md-6">
    <v-statisticcard name="昨日搜索量" :value="data.yes_search && data.yes_search.search || 0" />
  </div>
  <div class="col-md-6">
    <v-statisticcard name="昨日搜索词" :value="data.yes_search && data.yes_search.word || 0" />
  </div>
</div>
<div class="col-md-3" style="padding-left: 8px; padding-right: 8px;">
  <div class="col-md-6">
    <v-statisticcard name="今日搜索量" :value="data.today_search && data.today_search.search || 0" />
  </div>
  <div class="col-md-6">
    <v-statisticcard name="今日搜索词" :value="data.today_search && data.today_search.word || 0" />
  </div>
</div>
<div class="col-md-3" style="padding-left: 8px;">
  <div class="col-md-6">
    <v-statisticcard name="昨日用户" :value="data.yes_search && data.yes_search.user || 0" />
  </div>
  <div class="col-md-6">
    <v-statisticcard name="今日用户" :value="data.today_search && data.today_search.user || 0" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();

    function init() {
      store.dispatch('common/Fetch', {
        api: "visitStatistics",
        data: {}
      }).then(res => {

      })
    }

    function handleclick() {
      context.emit('onClick')
    }

    onMounted(init)
    return {
      handleclick
    }
  }
})
</script>

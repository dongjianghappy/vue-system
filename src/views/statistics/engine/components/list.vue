<template>
<table width="100%" class="table-striped table-hover col-left-1">
  <h3 class="pl10 font14">今日占比</h3>
  <table width="100%" class="table-striped table-hover col-left-2">
    <tr class="th">
      <td class="col-md-1">序号</td>
      <td class="col-md-5">搜索词</td>
      <td class="col-md-1">搜索次数</td>
      <td class="col-md-1">百度</td>
      <td class="col-md-1">谷歌</td>
      <td class="col-md-1">必应</td>
      <td class="col-md-1">360搜索</td>
      <td class="col-md-1">搜狗</td>
    </tr>
    <tr>
      <td>{{today.sort}}</td>
      <td>{{today.sort}}</td>
      <td>{{today.num}}</td>
      <td>{{today.baidu}}</td>
      <td>{{today.google}}</td>
      <td>{{today.biying}}</td>
      <td>{{today.so}}</td>
      <td>{{today.sogou}}</td>
    </tr>
  </table>
  <h3 class="pl10 font14">所有占比</h3>
  <table width="100%" class="table-striped table-hover col-left-2">
    <tr class="th">
      <td class="col-md-1">序号</td>
      <td class="col-md-5">搜索词</td>
      <td class="col-md-1">搜索次数</td>
      <td class="col-md-1">百度</td>
      <td class="col-md-1">谷歌</td>
      <td class="col-md-1">必应</td>
      <td class="col-md-1">360搜索</td>
      <td class="col-md-1">搜狗</td>
    </tr>
    <tr>
      <td>{{all.sort}}</td>
      <td>{{all.sort}}</td>
      <td>{{all.num}}</td>
      <td>{{all.baidu}}</td>
      <td>{{all.google}}</td>
      <td>{{all.biying}}</td>
      <td>{{all.so}}</td>
      <td>{{all.sogou}}</td>
    </tr>
  </table>
</table>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  useStore,
  useRoute
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    style: {
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

    const today = computed(() => {
      return store.getters['setting/engine1'].today || {}
    });

    const all = computed(() => {
      return store.getters['setting/engine1'].all || {}
    });

    return {
      today,
      all
    }
  }
})
</script>

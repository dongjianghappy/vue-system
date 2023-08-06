<template>
<v-calendar @changeMonth="changeMonth" :style="{height: '150px'}">
  <template v-slot:default="row">
    <template v-for="(item, index) in dataList" :key="index">
      <div class="p5 mb5 align_left font12 cl-white" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">
        <div class=" mb5 plr5" :class="item.status ? 'blue' : 'gray'" style="border-radius: 2px">词量: {{item.word || 0}} 个</div>
        <div class="mb5 plr5" :class="item.status ? 'green' : 'gray'" style="border-radius: 2px">新词量: {{item.new_word || 0}} 个</div>
        <div class="mb5 plr5" :class="item.status ? 'yellow' : 'gray'" style="border-radius: 2px">搜索次数: {{item.search || 0}} 次</div>
        <div class="mb5 plr5" :class="item.status ? 'red' : 'gray'" style="border-radius: 2px">用户量: {{item.user || 0}} 位</div>
      </div>
    </template>
  </template>
</v-calendar>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  useStore,
  useRoute,
  ref,
  codings
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  props: {
    render: {
      type: Function,
      default: () => {

      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const coding: any = codings
    const store = useStore();
    const dataList: any = ref([]);
    const route = useRoute();

    function changeMonth(data: any) {
      dateInit({
        year: data.fullYear,
        month: data.month
      })
    }

    function dateInit(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: "Calendar",
        data: {
          type: 'search',
          coding: route.path.indexOf("talk") === -1 ? coding.search.statistics : coding.talk.search.statistics,
          ...param
        }
      }).then((res: any) => {
        dataList.value = res.result
        debugger
      })
    }

    onMounted(() => {
      let date: any = new Date()
      dateInit({
        year: date.getFullYear(),
        month: date.getMonth() + 1
      })
    })

    return {
      dataList,
      dateInit,
      changeMonth
    }
  }
})
</script>

<style scoped>
.gray {
  background: #f8f8fa;
  color: #ccc;
}

.blue {
  background: #42a5f5;
  color: #fff;
}

.red {
  background: #ef5350;
  color: #fff;
}

.green {
  background: #4caf50;
  color: #fff;
}

.yellow {
  background: #ff9800;
  color: #fff;
}
</style>

<template>
<v-calendar @changeMonth="changeMonth" height="150px">
  <template v-slot:default="row">
    <template v-for="(item, index) in dataList" :key="index">
      <div class="p5 mb5 align_left font12 cl-white" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">
        <div class=" mb5 plr5" :class="item.status ? 'blue' : 'gray'" style="border-radius: 2px">词量: {{item.word || 0}} 个</div>
        <div class="mb5 plr5" :class="item.status ? 'green' : 'gray'" style="border-radius: 2px">新词量: {{item.new_word || 0}} 个</div>
        <div class="mb5 plr5" :class="item.status ? 'yellow' : 'gray'" style="border-radius: 2px">搜索次数: {{item.search || 0}} 次</div>
        <div class="mb5 plr5" :class="item.status ? 'red' : 'gray'" style="border-radius: 2px">用户量: {{item.new_word || 0}} 位</div>
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
  ref
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return []
      }
    },
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
    const store = useStore();

    function changeMonth(data: any) {
      debugger
      props.render({
        year: data.fullYear,
        month: data.month
      })
    }

    return {
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

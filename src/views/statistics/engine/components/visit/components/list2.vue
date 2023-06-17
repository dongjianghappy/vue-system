<template>
<table class="table-striped table-hover col-left-2">
  <tr class="th">
    <td class="col-md-1">序号</td>
    <td class="col-md-9">受访页面URL</td>
    <td class="col-md-1">浏览次数</td>
    <td class="col-md-1">占比</td>
  </tr>
  <tr>
    <td>1</td>
    <td></td>
    <td>22</td>
    <td></td>
  </tr>
  <tr>
    <td>2</td>
    <td>http://www.yunxi10.com/</td>
    <td>36</td>
    <td></td>
  </tr>
  <tr>
    <td>3</td>
    <td>http://www.yunxi10.com/article/1.html</td>
    <td>1</td>
    <td></td>
  </tr>
  <tr>
    <td>4</td>
    <td>http://www.yunxi10.com/article/16.html</td>
    <td>1</td>
    <td></td>
  </tr>
  <tr>
    <td>5</td>
    <td>http://www.yunxi10.com/course/2019/01/20/2.html</td>
    <td>2</td>
    <td></td>
  </tr>
  <tr>
    <td>6</td>
    <td>http://www.yunxi10.com/demo/1276</td>
    <td>2</td>
    <td></td>
  </tr>
  <tr>
    <td>7</td>
    <td>http://www.yunxi10.com/demo/14974</td>
    <td>1</td>
    <td></td>
  </tr>
</table>
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

    function init() {
        store.dispatch('common/Fetch', {
          api: "interviewedTodayStatistics",
          data: {
          }
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

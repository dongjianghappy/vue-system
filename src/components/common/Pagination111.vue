<template>
<div class="pagination-wrap">
  <button class="pagination-button deg180">
    <i class="iconfont icon-arrow" />
  </button>
  <ul>

    <li @click="handelClick(1)" v-if="pagination.page > 3">1</li>
    <li @click="handelClick()" v-if="pagination.page > 4">•••</li>
    <template v-for="(item) in pageNum" :key="item">

      <li :class="{current: pagination.page == item}" @click="handelClick(item)">{{item}}</li>
    </template>
    <li @click="handelClick()" v-if="pagination.total - 4 >= pagination.page ">•••</li>
    <li @click="handelClick(pagination.total)" v-if="parseInt(pagination.total) - parseInt(pagination.page) >= 4">{{pagination.total}}</li>
  </ul>
  <button class="pagination-button">
    <i class="iconfont icon-arrow" />
  </button>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  onMounted
} from 'vue'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    pagination: {
      type: Object,
      default: () => {
        return {
          total: 0,
          page: 1,
          pagesize: 10
        }
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  emits: ['clickPage'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const pageNum: any = ref([])

    function aaaaa() {

      const page: any = []
      let init: any = ""
      let end: any = ""
      debugger
      // 小于6
      if (props.pagination.total < 6) {
        init = 1
        end = props.pagination.total
      } else {
        if (props.pagination.page < 4) {
          init = 1
          end = 5
        } else if (parseInt(props.pagination.total) - parseInt(props.pagination.page) <= 3) {
          if (parseInt(props.pagination.total) - parseInt(props.pagination.page) === 3) {
            init = props.pagination.page - 2
          } else {
            init = props.pagination.page - 4 + (parseInt(props.pagination.total) - parseInt(props.pagination.page))
          }

          end = props.pagination.total
        } else if (parseInt(props.pagination.total) - parseInt(props.pagination.page) < 6) {

          init = props.pagination.page - 2
          end = props.pagination.total - 2
        } else {
          init = props.pagination.page - 2
          end = parseInt(props.pagination.page) + 2
        }
      }

      for (let i = init; i <= end; i++) {
        page.push(i)
      }

      pageNum.value = page

    }

    function handelClick(param: any) {
      props.pagination.page = param
      aaaaa()
      props.render({
        page: param,
        pagesize: props.pagination.pagesize
      })
    }

    onMounted(aaaaa)
    return {
      handelClick,
      pageNum
    }
  }
})
</script>

<template>
<div class="pagination-wrap">
  <button class="pagination-button deg180">
    <i class="iconfont icon-arrow" />
  </button>
  <ul>
    <template v-for="(item) in pageNum" :key="item">

      <li :class="{current: pagination.page == item}" @click="handelClick(item)">{{item}}</li>
    </template>
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
  computed
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


    const pageNum: any = computed(() => {
      const page: any = []

      for (let i = 1; i <= props.pagination.total; i++) {
        // 第一页和最后一页
        if (i === 1 || i === props.pagination.total) {
          page.push(i)
        }
        // 
        else {
          if (props.pagination.total > 5) {
            // 下一页更多 当前页码为1~3页时, 第6页为更多
            if (props.pagination.page <= 3 && i >= 6) {
              i === 6 && page.push('•••')
            }
            // 下一页更多, 当页面从第4页开始，更多按钮向后移动一位
            else if (props.pagination.page > 3 && i >= props.pagination.page + 3) {
              i === props.pagination.page + 3 && page.push('•••')
            }

            // 上一页更多 当前页码为倒数第1~3页时, 则倒数第6页为更多
            else if (props.pagination.total - props.pagination.page < 3 && i <= props.pagination.total - 5) {
              i === props.pagination.total - 5 && page.push('•••')
            }
            // 上一页更多, 当页面从倒数第4页开始，更多按钮向后移动一位
            else if ((props.pagination.page > 4 && i < props.pagination.page - 2 && props.pagination.total - props.pagination.page >= 3)) { // 
              i === props.pagination.page - 3 && page.push('•••')
            } else {
              page.push(i)
            }
          } else {
            page.push(i)
          }
        }

      }
      return page
    });

    function handelClick(param: any) {
      props.render({
        page: param,
        pagesize: props.pagination.pagesize
      })
      // context.emit('clickPage', param)

    }
    return {
      handelClick,
      pageNum
    }
  }
})
</script>

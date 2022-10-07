<template>
<div class="clearfix">
  <div class="col-md-4">
    <v-space class="mt15">
      <v-button @click="handleclick('all')" buttonType="button" >全选</v-button>
      <v-confirm name="删除" buttonType="button" :data="data" api="delete" :render="render" operating="alldelete" :auth="auth.checked('del')"></v-confirm>
      <v-confirm name="开启" buttonType="button" :data="{...data, operating: 'open' }" api="openAndClose" :render="render" operating="allopen" :auth="auth.checked('edit')"></v-confirm>
      <v-confirm name="关闭" buttonType="button" :data="{...data, operating: 'close' }" api="openAndClose" :render="render" operating="allclose" :auth="auth.checked('edit')"></v-confirm>
    </v-space>
  </div>
  <div class="col-md-8 align_right">
    <v-space class="mt15">
      <!-- <v-pagination :pagination="pagination" :render="render" v-if="Object.keys(pagination).length" /> -->
      <v-pagination :pagination="pagination" :render="render" />
    </v-space>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance
} from 'vue'

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
    },
    sorceData: {
      type: Array,
      default: []
    },
    pagination: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    checkedList: {
      type: Array,
      default: []
    },
    auth: {
      type: Object,
      default: () => {
        return {
          checked: () => {
            return
          }
        }
      }
    },
  },
  emits: ['onClick'],
  setup(props, context) {

    function handleclick(param: any) {

      if (props.disabled) {
        return
      }

      // 全选
      if (param === 'all') {
        if (props.checkedList.length !== props.sorceData.length) {
          props.sorceData.map((item: any) => {
            if (props.checkedList.indexOf(item.id) === -1) {
              props.checkedList.push(item.id)
            }
          })
        } else {
          props.checkedList.length = 0
        }

      }
    }

    // function handelPage(data: any) {
    //   alert(data+"sds")
    // }
    return {
      handleclick,
      // handelPage
    }
  }
})
</script>

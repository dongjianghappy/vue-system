<template>
<div style="display: flex; flex-flow: row; height: 500px; background: #4d4d4d;">
  <div style="display: flex; flex-flow: column; height: 500px; flex: 1">
    <div style="flex: 1">
      asdad
    </div>
    <div style="height: 70px">
      <Control :data="data" />
    </div>
  </div>
  <div style="width: 250px; background: #1b1b1b;">

    <div class="module-wrap nobg">
      <div class="module-head"> 歌曲列表 <span class="right"><i class="iconfont icon-refresh1"></i>点击刷新</span></div>
      <div class="module-content font12">
        <ul>
          <li v-for="(item, index) in dataList" :key="index">
            <div class="item-title relative pl15 pr40"><a class="ptb10 block">
              {{item.name}}
                <!--v-if--></a><span class="absolute cl-ccc" style="top: 10px; right: 15px;"><i class="iconfont icon-listen listen"></i></span></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  useStore
} from '@/utils'
import Window from './window.vue'
import Control from './control.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Window,
    Control

  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 名称
    name: {
      type: String,
      default: "按钮"
    },
    // 是否展示
    show: {
      type: Boolean,
      default: false
    },
    // 按钮类型
    buttonType: {
      type: String,
      default: "text"
    }
  },
  emits: ['update:show', 'onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore()
    const dataList: any = ref([])

    function handleclick() {
      context.emit('onClick')
      context.emit('update:show', !props.show)
    }

    function init() {
      store.dispatch('channel/musicListAction', {
        data: {
          page: 1,
          pagesize: 10,
          kind: 'music'
        }
      }).then((res: any) => {
        dataList.value = res.result.list
      })
    }

    onMounted(init)

    return {
      dataList,
      handleclick
    }
  }
})
</script>

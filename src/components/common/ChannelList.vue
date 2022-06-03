<template>
<div>
  <v-drawer name='<i class="iconfont icon-navicon pointer"></i>' :top="64" :width="200" >
    <template v-slot:content>
      <div class="channel-box">
        <ul class="navigation">
          <li class="font16" @click="handleRouter(item.module)" v-for="(item, index) in dataList" :key="index"><i class="iconfont mr10" :class="`icon-${item.icon}`"></i>
            {{item.name}}
          </li>
        </ul>
      </div>
    </template>
  </v-drawer>

</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'

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
    },
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },    
    setRoute: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    
    const isShow: any = ref(false)

    function handleRouter(param: any) {
      isShow.value = false
      props.setRoute({
        path: param,
        module: param
      })
    }

    return {
      isShow,
      module,
      handleRouter
    }
  }
})
</script>

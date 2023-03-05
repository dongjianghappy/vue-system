<template>
<div class="position-wrap">
  <div class="position-dir pl15"><span>首页</span></div>
  <ul class="position-nav align_center">
    <li class="ant-col ant-col-2 pointer"><i class="iconfont icon-more font18" @click="handleRouter('appstore', 'setting')"></i></li>
    <li class="ant-col ant-col-2">
      <SystemSetting :auth="true" />
    </li>
    <li class="ant-col ant-col-2" v-if="channel.length>0">
      <v-drawershow name='<i class="iconfont icon-app pointer"></i>' title="频道" icon="add" type="text" :style="{width: '800'}" :data="1" initialValues="initialValues" :renderList="getData">
        <template v-slot:content>
          <ul class="channel-boxs">
            <li class="col-md-3 p5" v-for="(item, index) in channel" :key="index" draggable="true" @mouseover="hover(item)" @mouseleave="leave(item)" @click="handleRouter(item.module)" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
              <div class="channel-list p25" :class="{isopen: item.status === '1'}"  style="box-shadow: 0 1px 3px rgb(27 95 160 / 10%) !important;">
              <v-chanelcard :data="{item, name: item.name, coding: 'O0000'}" className="channel-bg" />
              </div>
            </li>
          </ul>
        </template>
      </v-drawershow>
    </li>
    <li class="ant-col ant-col-2">
      <v-drawershow name='<i class="iconfont icon-navicon pointer"></i>' :style="{width: '200'}">
        <template v-slot:content>
          <div class="channel-box">
            <ul class="navigation">
              <li class="font16" @click="handleRouter(item.module)" v-for="(item, index) in module" :key="index"><i class="iconfont mr10" :class="`icon-${item.icon}`"></i>
                {{item.name}}
              </li>
            </ul>
          </div>
        </template>
      </v-drawershow>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  useStore,
} from '@/utils'
import SystemSetting from '@/components/packages/setting/systemSetting.vue'

import {
  MODUDLE
} from '@/assets/const'
export default defineComponent({
  name: 'v-Position',
  components: {
    SystemSetting
  },
  props: {
    setRoute: {
      type: Function,
      default: () => {
        return
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const module: any = MODUDLE
    const channel = computed(() => store.getters['user/channel']);
    const setting = computed(() => store.getters['user/setting']);

    function handleRouter(param: any, module: any) {
      props.setRoute({
        path: param,
        module: module || param
      })
    }

    function handleRouterss(data: any) {
      props.setRoute({
        path: data.param,
        module: data.module
      })
    }

        function hover(item: any) {
      item.hover = true
    }

    function leave(item: any) {
      item.hover = false
    }

    return {
      module,
      channel,
      setting,
      handleRouter,
      handleRouterss,
      hover,
      leave,
    }
  }
})
</script>

<style lang="less">
.collapse{
  background: #fff;
  .collapse-head{
    padding: 15px;
    background: #f8f8fa;
  }
  .collapse-list{
    background: #fff;
  }
}

</style>
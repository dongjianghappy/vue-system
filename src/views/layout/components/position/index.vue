<template>
<div class="position-wrap">
  <div class="position-dir pl15"><span>首页</span></div>
  <ul class="position-nav align_center">
    <li class="ant-col ant-col-2 pointer"><i class="iconfont icon-more font18" @click="handleRouter('appstore', 'setting')"></i></li>
    <li class="ant-col ant-col-2">
      <SystemSetting :auth="true" :data={coding} />
    </li>
    <li class="ant-col ant-col-2" v-if="channel.length>0">
      <v-drawershow name='<i class="iconfont icon-app pointer"></i>' icon="add" type="text" :style="{width: '800'}" :data="1" initialValues="initialValues" :renderList="getData">
        <template v-slot:content>
          <ul>
            <li class="col-md-3 p5" v-for="(item, index) in channel" :key="index" draggable="true" @mouseover="hover(item)" @mouseleave="leave(item)" @click="handleRouter(item.module)" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
              <v-cards :class="{isopen: item.status === '1'}">
                <template v-slot:content>
                  <div class="font16" style="height: 50px; line-height: 50px;">
                    {{item.name}}
                  </div>
                </template>
              </v-cards>
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
  codings
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
    const coding: any = codings
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
      coding,
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

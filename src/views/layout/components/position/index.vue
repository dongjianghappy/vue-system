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
            <li style=" margin-bottom: 10px; width: 187px; float: left; padding-right: 8px;" v-for="(item, index) in channel" :key="index" draggable="true" @click="handleRouter(item.module)" @dragend="handleDragEnd($event, item)" @dragstart="handleDragStart($event, item)" @dragenter="handleDragEnter($event, item)" @dragover.prevent="handleDragOver($event, item)">
              <v-statisticcard :data="item" className="channel-bg" />
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

    return {
      module,
      channel,
      setting,
      handleRouter,
      handleRouterss,
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
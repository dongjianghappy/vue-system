<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="静态生成">
      <template v-slot:extraright v-if="auth.checked('server')">
        <Popover :content="`服务器:${server[serve]}`" arrow="tb" offset="right" :move="-20" :keys="`static_${index}`">
          <ul class="font14" style="display: block">
            <li v-for="(item, index) in server" :key="index" style="height: 32px" @click="handleSelectServer(index)">{{item}}</li>
          </ul>
        </Popover>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15 font12">

    <table width="100%" class="table-channel table-striped table-hover static-wrap">
      <tr v-for="(item, index) in channel" :key="index" style="background-color: #fafafa;">
        <td style="width: 120px;">
          <div class="card" style="height: 98px;">
            <div class="ant-card-body">
              <h3>{{item.name}}</h3>
            </div>
          </div>
        </td>
        <td>
          <div class="card" style="height: 98px;">
            <div class="col-md-12" style="padding-bottom: 10px;"><span class="name">首页</span></div>
            <div class="col-md-10" style="display: flex;">
              <v-progress />
            </div>
            <div class="col-md-2 updateButton">
              <Progress :data="{title: `正在更新${item.name}首页`, data: {serve, action: 'index', model: item.model}}" />
            </div>
          </div>
        </td>
        <!-- 单页 -->
        <td v-if="index === 0">
          <div class="card" style="height: 98px;">
            <div class="col-md-12" style="padding-bottom: 10px;"><span class="name">单页</span></div>
            <div class="col-md-10" style="display: flex;">
              <v-progress />
            </div>
            <div class="col-md-2 updateButton">
              <Progress :data="{title: `正在更新单页页`, data: {serve, action: 'single', model: 'single'}}" />
            </div>
          </div>
        </td>
        <!-- 栏目页 -->
        <td v-else>
          <div class="card" style="height: 98px;">
            <div class="col-md-12" style="padding-bottom: 10px;"><span class="name">栏目</span></div>
            <div class="col-md-10" style="display: flex;">
              <v-progress />
            </div>
            <div class="col-md-2 updateButton">
              <Progress :data="{title: `正在更新${item.name}栏目页`, data: {serve, action: 'menu', model: item.model}}" />
            </div>
          </div>
        </td>
        <td>
          <div v-if="index === 0" style="display: flex">
            <div class="card mr5" style="height: 98px; flex: 1">
              <div class="col-md-12" style="padding-bottom: 10px;"><span class="name">地图</span></div>
              <div class="col-md-10" style="display: flex;">
                <v-progress />
              </div>
              <div class="col-md-2 updateButton">
                <Progress :data="{title: `正在更新单页页`, data: {serve, action: 'sitemap', model: 'single'}}" />
              </div>
            </div>
            <div class="card ml5" style="height: 98px; flex: 1">
              <div class="col-md-12" style="padding-bottom: 10px;"><span class="name">标签</span></div>
              <div>
                <div class="col-md-5 limit relative">
                  <Popover :content="`<div>排序: <span>${sort[item.sort]}</span></div>`" arrow="tb" offset="right" :move="-10" :keys="`static_${index}`">
                    <ul>
                      <li @click="item.sort = i" v-for="(data, i) in sort" :key="i">{{data}}</li>
                    </ul>
                  </Popover>
                </div>
                <div class="col-md-5 limit relative">
                  <Popover :content="`<span>范围: ${item.limitStart} - ${item.limitEnd}</span>`" arrow="tb" offset="right" :move="-100" :keys="`static_${index}`">
                    <div class="p10" style="display: flex"><input maxlength="5" type="text" class="ant-input" v-model="item.limitStart" style="width: 100px; flex: 1"><span class="pl15 pr15"> 至 </span><input maxlength="5" type="text" class="ant-input" v-model="item.limitEnd" style="width: 100px; flex: 1"></div>
                  </Popover>
                </div>
                <div class="col-md-2 updateButton">
                  <Progress :data="{title: `正在更新标签页`, data: {serve, action: 'tag', model: 'source', id: `${item.limitStart}-${item.limitEnd}`,
                        method: item.sort,
                        total: item.limitEnd - item.limitStart}}" />
                </div>
              </div>
            </div>
          </div>
          <div class="card" style="height: 98px;" v-else>
            <div class="col-md-12" style="padding-bottom: 10px;"><span class="name">详情</span></div>
            <div>
              <div class="col-md-2 limit relative">
                <Popover :content="`<div>排序: <span>${sort[item.sort]}</span></div>`" arrow="tb" offset="right" :move="-10" :keys="`static_${index}`">
                  <ul>
                    <li @click="item.sort = i" v-for="(data, i) in sort" :key="i">{{data}}</li>
                  </ul>
                </Popover>
              </div>
              <div class="col-md-3 limit relative">
                <Popover :content="`<span>范围: ${item.limitStart} - ${item.limitEnd}</span>`" arrow="tb" offset="right" :move="-100" :keys="`static_${index}`">
                  <div class="p10" style="display: flex"><input maxlength="5" type="text" class="ant-input" v-model="item.limitStart" style="width: 100px; flex: 1"><span class="pl15 pr15"> 至 </span><input maxlength="5" type="text" class="ant-input" v-model="item.limitEnd" style="width: 100px; flex: 1"></div>
                </Popover>
              </div>
              <div class="col-md-6" style="display: flex;">
                <v-progress />
              </div>
              <div class="col-md-1 updateButton">
                <Progress :data="{title: `正在更新${item.name}详情页`, data: {serve, action: 'article', model: item.model, id: `${item.limitStart}-${item.limitEnd}`,
                        method: item.sort,
                        total: item.limitEnd - item.limitStart}}" />
              </div>
            </div>
          </div>
        </td>
      </tr>

    </table>
    <v-nodata :data="channel" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'
import Popover from '@/components/packages/popover/index.vue';
import Progress from './components/progress.vue';
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Popover,
    Progress
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const userInfo = computed(() => store.getters['user/userInfo']);
    const channel = computed(() => store.getters['common/channel']);
    const server: any = {
      'none': '请选择',
      'localhost': '本地服务',
      'yunxi10.com': '07素材网',
      'dongblog.com': '东江博客',
    }
    const sort: any = {
      'desc': '递减',
      'asc': '递增',
    }
    const serve: any = ref("none")

    function init() {
      store.dispatch('common/Channel', {
        api: 'static'
      })
    }

    function handleSelectServer(param: any) {
      serve.value = param
    }

    onMounted(init)

    return {
      serve,
      server,
      userInfo,
      channel,
      handleSelectServer,
      sort,
      auth: proxy.$auth.init('statics')
    }
  }
})
</script>

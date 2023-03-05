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
            <div class="col-md-12" style="padding-bottom: 10px;">
              <span class="relative">
                <span class="mr10">栏目</span>
                <span class="mr10" v-if="item.fid">{{item.parent}}</span>
                <v-category name="选择分类" :data="{item, coding: item.coding}" :isInt="true" isCurrent="true" type="text"></v-category>
              </span>
            </div>
            <div class="col-md-10" style="display: flex;">
              <v-progress />
            </div>
            <div class="col-md-2 updateButton">
              <Progress :data="{title: `正在更新${item.name}栏目页`, data: {serve, action: 'menu', model: item.model, fid: item.fid ? item.fid : ''}}" />
            </div>
          </div>
        </td>
        <td>
          <!-- 首页 -->
          <div v-if="item.model === 'index'" style="display: flex">
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
          <!-- 资源频道 -->
          <div v-else-if="item.model === 'source'" style="display: flex">
            <div class="card mr5" style="height: 98px; flex: 1">
              <div class="col-md-12" style="padding-bottom: 10px;"><span class="name">详情</span></div>
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
                  <Progress :data="{title: `正在更新${item.name}详情页`, data: {serve, action: 'article', model: item.model, id: `${item.limitStart}-${item.limitEnd}`,
                        method: item.sort,
                        total: item.limitEnd - item.limitStart}}" />
                </div>
              </div>
            </div>
            <div class="card ml5" style="height: 98px; flex: 1">
              <div class="col-md-12 relative" style="padding-bottom: 10px;">
                <span class="name mr10">其他素材</span>
                <Popover :content="`<div>种类: <span>${currentKind.name}</span></div>`" arrow="tb" offset="right" :move="-10" :keys="`kind_${index}`">
                  <ul class="p15">
                    <li @click="changeKind(data)" v-for="(data, i) in item.list" :key="i">{{data.name}}</li>
                  </ul>
                </Popover>
              </div>
              <div>
                <div class="col-md-5 limit relative">
                  <Popover :content="`<div>排序: <span>${sort[currentKind.sort]}</span></div>`" arrow="tb" offset="right" :move="-10" :keys="`static_${index}`">
                    <ul>
                      <li @click="currentKind.sort = i" v-for="(data, i) in sort" :key="i">{{data}}</li>
                    </ul>
                  </Popover>
                </div>
                <div class="col-md-5 limit relative">
                  <Popover :content="`<span>范围: ${currentKind.limitStart} - ${currentKind.limitEnd}</span>`" arrow="tb" offset="right" :move="-100" :keys="`static_${index}`">
                    <div class="p10" style="display: flex"><input maxlength="5" type="text" class="ant-input" v-model="currentKind.limitStart" style="width: 100px; flex: 1"><span class="pl15 pr15"> 至 </span><input maxlength="5" type="text" class="ant-input" v-model="currentKind.limitEnd" style="width: 100px; flex: 1"></div>
                  </Popover>
                </div>
                <div class="col-md-2 updateButton">
                  <Progress :data="{title: `正在更新${currentKind.name}详情页`, data: {serve, action: 'article', model: item.model, type: currentKind.value, id: `${currentKind.limitStart}-${currentKind.limitEnd}`,
                        method: currentKind.sort,
                        total: currentKind.limitEnd - currentKind.limitStart}}" />
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
      'none': '请选择'
    }
    const sort: any = {
      'desc': '递减',
      'asc': '递增',
    }
    const kind: any = ref({})
    const currentKind: any = ref({})
    const serve: any = ref("none")

    function init() {

      // 获取站点信息
      store.dispatch('basic/Fetch', {
        state: 'announcement',
        data: {
          coding: "Q0018",
          page: 1,
          pagesize: 10,
          status: '1'
        }
      }).then(res => {
        server
        debugger
        res.result.list.map((item:any) => {
          server[item.domain] = item.name
        })
      })
    

      store.dispatch('common/Channel', {
        api: 'static'
      }).then((res: any) => {
        // 素材种类初始化
        res.result.map((item: any) => {
          if (item.model === 'source') {
            currentKind.value = item.list[0]
            currentKind.value.limitStart = "1"
            currentKind.value.limitEnd = item.list[0].num
            currentKind.value.sort = 'desc'
          }
        })
      })
    }

    // 选择素材种类
    function changeKind(param: any) {
      currentKind.value = param
      currentKind.value.limitStart = "1"
      currentKind.value.limitEnd = param.num
      currentKind.value.sort = 'desc'
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
      kind,
      currentKind,
      changeKind,
      auth: proxy.$auth.init('statics')
    }
  }
})
</script>

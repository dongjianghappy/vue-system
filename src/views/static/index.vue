<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="静态生成">
      <template v-slot:extraright v-if="auth.checked('server')">
        <space>
          <Detail :data="{serve, dataList: currentKind}" />
          <v-popover :content="`服务器:${enumServer[serve]}`" arrow="tb" offset="right" :move="-20" :keys="`static_${index}`">
            <ul class="font14" style="display: block">
              <li v-for="(item, index) in enumServer" :key="index" style="height: 32px" @click="handleSelectServer(index)">{{item}}</li>
            </ul>
          </v-popover>
        </space>
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15 font12">
    <table class="table-channel table-striped table-hover static-wrap">
      <tr v-for="(item, index) in channel" :key="index" style="background-color: #fafafa;">
        <td style="width: 120px;">
          <div class="card h100">
            {{item.name}}
          </div>
        </td>
        <td>
          <Card title="首页" :item="item" :data=" {serve, action: 'index', model: item.model}" />
        </td>
        <td v-if="index === 0">
          <Card title="单页" :item="item" :data="{serve, action: 'single', model: 'single'}" />
        </td>
        <td v-else>
          <Card title="栏目" :item="item" :data="{serve, action: 'menu', model: item.model, fid: item.fid || ''}" />
        </td>
        <td>
          <div class="flex" v-if="item.model === 'index'">
            <Card title="地图" :item="item" :data="{serve, action: 'sitemap', model: 'single'}" class="mr5" style="flex: 1" />
            <Card title="标签" :item="item" :data="{serve, action: 'tag', model: 'source', id: `${item.limitStart}-${item.limitEnd}`, method: item.sort, total: item.limitEnd - item.limitStart}" class="ml5" style="flex: 1" :isDetail="true" />
          </div>
          <Card title="详情" :item="item" :data="{serve, action: 'article', model: item.model, id: `${item.limitStart}-${item.limitEnd}`, method: item.sort, total: item.limitEnd - item.limitStart}" :isDetail="true" v-else />
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
  ref,
  useStore,
  codings
} from '@/utils'
import Progress from './components/progress.vue';
import Card from './components/card.vue';
import Detail from './components/detail.vue';
import Space from '@/components/public/Space.vue';
export default defineComponent({
  name: 'Static',
  components: {
    Progress,
    Card,
    Detail,
    Space
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.site;
    const store = useStore();
    const channel = computed(() => store.getters['common/channel']);
    const enumServer: any = {
      'none': '请选择'
    }
    const serve: any = ref("none")
    const currentKind: any = ref([])

    function init() {
      store.dispatch('basic/Fetch', {
        data: {
          coding: coding.list,
          status: '1'
        }
      }).then(res => {
        res.result.map((item: any) => {
          enumServer[item.domain] = item.name
        })
      })

      store.dispatch('common/Channel', {
        api: 'static'
      }).then((res: any) => {
        // 素材种类初始化
        res.result.map((item: any) => {
          if (item.model === 'source') {
           currentKind.value = item.list.map((item: any) => {
              return {
                ...item,
                limitStart: '1',
                limitEnd: item.num,
                sort: 'desc'
              }
            })
          }
        })
      })
    }

    function handleSelectServer(param: any) {
      serve.value = param
    }

    onMounted(init)

    return {
      serve,
      enumServer,
      channel,
      handleSelectServer,
      currentKind,
      auth: proxy.$auth.init('statics')
    }
  }
})
</script>

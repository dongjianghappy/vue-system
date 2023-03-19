<template>
<div class="ptb5" style="background: #fff">
  <v-tabs :tabs="menu">
    <template v-slot:extra>
      <v-space>
        <span class="pt10">
          <v-search :render="init" />
        </span>
        <span>
          <Popover content="<i class='iconfont icon-calendar' />" arrow="tb" offset="right" :move="-150" keys="calendar">
            <div style="width: 350px; height: 350px;">
              <v-calendar @changeMonth="changeMonth" @changeDay="changeDay">
                <template v-slot:default="row">
                  <template v-for="(item, index) in calendarData" :key="index">
                    <div style="display: flex; flex-wrap:wrap; position: absolute; width: 100%; bottom: 0px; top: 25px; padding: 10px" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">
                      <div class="col-md-4" style="height: 32px;" v-for="(list, i) in item.list.slice(0, 5)" :key="i"><img :src="list.photos" style="border-radius: 50px; width: 32px; height: 32px;"></div>
                      <div class="col-md-4" style=" height: 32px; line-height: 32px; display: inline-block;">
                        <div style="background: #ddd; border-radius: 50px; width: 32px; height: 32px;" v-if="item.list.length > 5">{{item.num}}</div>
                      </div>
                    </div>
                  </template>
                </template>
              </v-calendar>
            </div>
          </Popover>
        </span>
        <span>
          <Popover content="<i class='iconfont icon-list' />" arrow="tb" offset="right" :move="-650" keys="cateList">
            <div class="p15" style="width: 750px; height: 300px;">
              <perfect-scrollbar>
                <div class="item_t" style="min-height: 120px">
                  <div v-for="(item, index) in cateList" :key="index">
                    <div @click="handleCate(item.id)">{{item.name}}</div>
                    <div id="goods-type-list" v-for="(list, i) in item.list" :key="i">
                      <div class="left"><a @click="handleCate(list.id)">{{list.name}}</a> </div>
                      <div class="right">
                        <a class="" v-for="(data, j) in list.list" :key="j" @click="handleCate(data.id)">{{data.name}}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </perfect-scrollbar>
            </div>
          </Popover>
        </span>
        <v-condition name="排序" icon="sort-desc" field="sorter" :enums="[{value: 'id desc', name: '递减'}, {value: 'id asc', name: '递增'}]" :render="init" />
        <Popover content="<i class='iconfont icon-font-colors' />" arrow="tb" offset="right" :move="-250" keys="calendar">
          <div class="color-list color-wrap" style="width: 300px; height: 150px;">
            <a class="col-md-3 color p5" @click="handleColor()">
              <div class="cl">
                <i class="size-32-24 all" style="border: 1px solid #eee;"></i>所有
              </div>
            </a>
            <a class="col-md-3 color p5" @click="handleColor(item.value)" v-for="(item, index) in colorList" :key="index">
              <div class="cl">
                
                <i class="size-32-24" :class="item.value" style="border: 1px solid #eee;"></i>{{item.name}}
              </div>
            </a>
          </div>
        </Popover>
        <!-- <v-condition name="颜色" icon="font-colors" field="color" :enums="colorList" :render="init" v-if="channelData.module ==='picture'" /> -->
        <v-toggledisplay v-model:toggle="toggleDisplay" />
        <v-button @onClick="handleClick('add')" :disabled="auth.checked('add')" v-if="channelData.module !=='video' && channelData.module !=='source' && channelData.module !=='design' && channelData.module !=='office'">
          <i class="iconfont icon-anonymous-iconfont" />新增文档
        </v-button>
        <SourceDetail :coding="coding" :render="init" v-else-if="channelData.module ==='source'" />
        <DesignDetail :coding="coding" :render="init" v-else-if="channelData.module ==='design'" />
        <OfficeDetail :coding="coding" :render="init" v-else-if="channelData.module ==='office'" />
        <uploadVideo :coding="coding" v-else />
      </v-space>
    </template>
    <template v-slot:content1>
      <List :type='page.value' :data="{...channelData, coding, aaa}" :render="init" v-if="toggleDisplay === 'list'" :loading="loading" :auth="auth" />
      <Album :data="{...channelData, coding, aaa}" :render="init" v-else :loading="loading" :auth="auth" :type="channelData.module === 'video' ? 'video' : 'image'" />
    </template>
    <template v-slot:content2>
      <List2 :type='page.value' :data="{...channelData}" :render="init" :loading="loading" :auth="auth" />
    </template>
    <template v-slot:content3>
      <List3 :type='page.value' :data="{...channelData}" :loading="loading" :auth="auth" />
    </template>
  </v-tabs>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  watch,
  useRoute,
  useRouter,
  channels
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  visitPage
} from '@/assets/const'
import {
  COLOR
} from '@/assets/enum'
import List from "./components/list.vue"
import List2 from "./components/list2.vue"
import List3 from "./components/list3.vue"
import Album from "./components/album.vue"
import Video from "../video/index.vue"
import uploadVideo from '../video/components/detail.vue'
import SourceDetail from '../source/components/detail.vue'
import DesignDetail from '../design/components/detail.vue'
import OfficeDetail from '../office/components/detail.vue'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Popover,
    List,
    List2,
    List3,
    Album,
    Video,
    uploadVideo,
    SourceDetail,
    DesignDetail,
    OfficeDetail
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router: any = useRouter();
    const channelData: any = channels();
    const coding: any = channels().coding;
    const aaa: any = ref([])
    const toggleDisplay: any = ref("list")
    const loading: any = ref(false)
    const pagesize: any = 10

    let menu: any = ref([{
        name: "文档管理",
        value: "appstore1"
      },
      {
        name: "正在审核",
        value: "appstore2"
      },
      {
        name: "已退回",
        value: "appstore2"
      }
    ])
    const colorList = COLOR
    const cateList: any = ref([])

    if (channelData.module === 'picture') {
      menu.value[0].name = "图片管理"
      toggleDisplay.value = 'album'
    } else if (channelData.module === 'video') {
      menu.value[0].name = "视频管理"
      toggleDisplay.value = 'album'
    } else if (channelData.module === 'website') {
      menu.value[0].name = "网站管理"
      toggleDisplay.value = 'album'
    } else if (channelData.module === 'source') {
      menu.value[0].name = "资源管理"
    } else if (channelData.module === 'funny') {
      menu.value[0].name = "搞笑段子"
    }

    let page: any = ref(visitPage[0])
    let type: any = ref(1)

    // 监听路由
    watch(router.currentRoute, (newValues, prevValues) => {
      if (newValues.path === prevValues.path) {
        let qq: any = route.query
        type.value = qq.type
        init({
          page: 1
        })
      }
    })

    function getCate() {
      store.dispatch('channel/cateListAction', {
        module: channelData.module,
        data: {
          coding: coding.cate
        }
      }).then(res => {
        cateList.value = res.result
      })
    }

    function init(param: any) {

      const sssss: any = {
        page: 1,
        pagesize: pagesize
      }

      Object.assign(sssss, param)
      const {
        type
      }: any = route.query

      loading.value = false
      store.dispatch('channel/articleListAction', {
        api: "articleList",
        tabsIndex: route.query.type === undefined ? 0 : route.query.type,
        module: channelData.module,
        data: {
          coding: coding.art,
          management_checked: type === '2' ? -1 : type === '1' ? 0 : 1, // 是否审核,
          ...sssss
        }
      }).then(res => {
        loading.value = true
      })
    }

    function handleClick(params: any) {
      let url = `/admin/${channelData.module}/list/add`
      if (params !== 'add') {
        url = url + `&id=${params.id}`
      }

      router.push(url)
    }

    function handleColor(param: any) {
      init({
        color: param
      })
    }

    function changeDay(data: any) {
      debugger
      init({
        year: data.fullYear,
        month: data.month,
        day: data.day
      })
    }

    function handleCate(param: any) {
      init({
        fid: `|${param}|`,
      })
    }

    onMounted(() => {
      // 聚合标签
      store.dispatch('common/Fetch', {
        api: "getTagCheckbox",
        data: {
          channel_id: channelData.id,
          type: 'art'
        }
      }).then(res => {
        aaa.value = res.result
      })

      init({
        page: 1
      })
      getCate()
    })

    return {
      coding,
      loading,
      colorList,
      init,
      channelData,
      page,
      menu,
      type,
      handleClick,
      aaa,
      toggleDisplay,
      changeDay,
      cateList,
      handleCate,
      handleColor,
      auth: proxy.$auth.init(`channel/${channelData.module}/art`)
    }
  }
})
</script>

<style scoped>
.ps {
  height: 250px;
}
</style>

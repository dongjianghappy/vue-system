<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-write"></i>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑分类' : '新增分类' " :style="style" :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li clearfix">
        <span class="label">频道名称</span>
        <div class="col-md-6"><input v-model="detail.name" type="text" placeholder="请输入频道名称" class="input-sm input-full" /></div>
        <div class="col-md-6 pl25">
          <input v-model="detail.icon" type="text" placeholder="请输入图标" class="input-sm input-150 mr15" />
          <Popover content="选择图标" arrow="tb" offset="right" :move="-400" :keys="`static_${index}`">
            <div style="display: flex; flex-wrap: wrap; padding: 16px; width: 400px">
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-home" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-shezhi" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-list" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-article" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-like" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-comment" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-star" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-download" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-recycle" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-slideshow" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-app" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-gather" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-mysql" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-moxing" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-route" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-dot" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-email" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-order" style="color: rgb(153, 153, 153);"></i></span>
              <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-user" style="color: rgb(153, 153, 153);"></i></span>
            </div>
          </Popover>
        </div>

      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">服务器</span>
        <v-select :enums="serverName" v-model:value="detail.server" :defaultValue="detail.server = detail.server ? detail.server : 'localhost'" />
      </li>
      <li class="li">
        <span class="label">是否显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <SpaceModal>
          <div class="space-wrap" style="display: flex;">
            <div class="space-picture p10" style="background: rgb(250, 250, 250); flex: 2 1 0%; height: auto;">
              <div class="pointer"><img width="250" height="100" alt=""></div>
            </div>
            <div style="flex: 1 1 0%;">
              <div style="flex: 1 1 0%; display: flex; justify-content: center;">
                <div>
                  <div style="background: rgb(250, 250, 250); border: 2px dashed rgb(238, 238, 238); height: 150px; width: 150px; line-height: 150px; text-align: center;"><i class="iconfont icon-add font30"></i></div>
                </div>
              </div>
            </div>
          </div>
        </SpaceModal>
      </li>
      <li class="li clearfix">
        <span class="label">页面标题</span>
        <input v-model="detail.seotitle" type="text" placeholder="请输入频道页面标题" class="input-sm input-full mb10" />
        <input v-model="detail.behind_title" type="text" placeholder="请输入频道名称标题后缀" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">关键字</span>
        <v-tag v-model:tags="detail.keyword" />
      </li>
      <li class="li clearfix">
        <span class="label">描述</span>
        <textarea placeholder="请输入频道页面描述" v-model="detail.description" class="w-full mb10"></textarea>
        <textarea placeholder="描述后缀" v-model="detail.behind_description" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  NAV_TYPE,
  SERVER_NAME
} from '@/assets/enum'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Search',
  components: {
    Popover
  },
  props: {
    style: {
      type: Object,
      default: {
        width: '800'
      }
    },
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
    action: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    checkboxList: {
      type: Array,
      default: []
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const navType: any = NAV_TYPE
    const serverName: any = SERVER_NAME
    const store = useStore();
    const aaa: any = ref([])

    let menu: any = ref([{
        name: "分类信息",
        value: "appstore1"
      },
      {
        name: "页面信息",
        value: "appstore2"
      }
    ])
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    // 聚合标签
    function checkbox() {
      store.dispatch('common/Fetch', {
        api: "getFlag",
        data: {
          channel_id: '0',
          type: 'art'
        }
      }).then(res => {
        aaa.value = res.result
      })
    }

    function submit(params: any) {
      const {
        name,
        icon,
        sort,
        server,
        status,
        seotitle,
        behind_title,
        keyword,
        description,
        behind_description
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "update",
        data: {
          coding: "O0000",
          id: props.data.id,
          name,
          icon,
          sort,
          server,
          status,
          seotitle,
          behind_title,
          keyword,
          description,
          behind_description
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
        props.render()
      })

    }

    return {
      isShow,
      detail,
      submit,
      drawer,
      menu,
      navType,
      aaa,
      serverName
    }
  }
})
</script>

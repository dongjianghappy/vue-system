<template>
<div class="mb10 col-md-9" style="overflow: auto; background: #fff">
  <div class="mb10">
    <div class="module-wrap">
      <div class="module-head">
        <v-optionsbar :title="action.indexOf('/add') > -1 ? '新增内容' : '编辑内容'">
          <template v-slot:extraleft>
            <span class="pointer" style="margin-top: 1px;" @click="handleClick">返回</span>
          </template>
        </v-optionsbar>
      </div>
      <div class="module-content" style="padding: 0 25px !important;">
        <v-tabs :tabs="menu" method="click">
          <template v-slot:extra>

          </template>
          <template v-slot:content1>
            <ul class="form-wrap-box">
              <li class="vertical">
                <div class="label">标题</div>
                <div style="display: flex">
                  <div style="flex: 1">
                    <input id="title" v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
                  </div>
                  <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
                </div>
              </li>
              <li class="vertical">
                <div class="label">标签</div>
                <div>
                  <v-tag v-model:tags="detail.tag" />
                </div>
              </li>
              <li class="vertical bg-f7f8fa">
                <v-tabs :tabs='[
	{
		name: "内容",
		value: "appstore1"
	},
	{
		name: "摘要",
		value: "appstore2"
	}
]'>
                  <template v-slot:content1>
                    <v-editor v-model:contentsss="detail.markdown" :data="detail" />
                  </template>
                  <template v-slot:content2>
                    <v-editor v-model:contentsss="detail.summary_markdown" :data="detail" />
                  </template>
                </v-tabs>
              </li>
              <li class="vertical">
                <div class="label">聚合标签</div>
                <div>
                  <v-checkboxgroup :tagList="aaa" :checked="detail.flags" />
                </div>
              </li>
            </ul>
          </template>
          <template v-slot:content2>
            <ul class="form-wrap-box">
              <template v-for="(item, index) in columns" :key="index">
                <li class="vertical">
                  <div class="label">{{item.remark}}</div>
                  <div>
                    <input v-model="detail[item.fields]" type="text" class="input-sm input-full" v-if="item.text_type === 'input'" />
                    <textarea v-model="detail[item.fields]" class="w-full" v-else-if="item.text_type === 'textarea'"></textarea>
                  </div>
                </li>
              </template>
            </ul>
          </template>
        </v-tabs>

        <div>
          <button class="btn btn-default btn-primary plr15" @click="save">保存</button>
        </div>
      </div>

    </div>
  </div>
</div>
<div class="col-md-3" style="overflow: auto;">
  <div style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head">
        <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
          <input type="checkbox" v-model="detail.checked" :checked="detail.checked" class="mr5" style="float: left;"><span>显示</span></label>
        <span class="right"><button class="btn btn-default btn-primary" @click="save">保存</button></span>
        <span class="right mr10"><button class="btn btn-default btn-primary" @click="handleUpdate(detail)">生成静态</button></span>
        <span class="right mr10"><a class="btn btn-default btn-primary" :href="`http://www.${channelData.server}/${channelData.module}/${detail.id}.html`" target="_blank">预览</a></span>
      </div>
      <div class="module-content plr15">
        <ul class="form-wrap-box">
          <li class="vertical">
            <div class="label">所属分类

            </div>
            <div>
              {{detail.parent}}
              <v-category name="选择分类" :data="{item: detail, coding: channelData.coding}" :isMore="true" type="text"></v-category>
            </div>
          </li>

          <li class="vertical">
            <div class="label">所属专辑

            </div>
            <div>
              {{detail.parent}}
              <v-category name="选择专辑" :data="{item: detail, coding: '123'}" :isMore="true" type="text"></v-category>
            </div>
          </li>

          <li class="vertical">
            <div class="label">背景音乐

            </div>
            <div>
              {{detail.music_name}}
              <v-choose title="选择音乐" :data="{ item: detail, field: 'singer' }" coding="E0000" @choose="choose" type="radio" api="articleList" />
            </div>
          </li>

          <li class="vertical">
            <div class="label">文章来源
              <Source action="edit" :render="renderChannel" :data="{channel_id: channelData.id, coding: 'O0017'}" @getSource="getSource" :auth="true" :isChoose="'true'" />
            </div>
            <div>
              <input type="text" v-model="detail.source" placeholder="请输入来源名称" class="input-sm input-full mb10" />
              <input type="text" v-model="detail.source_url" placeholder="请输入来源地址" class="input-sm input-full" />
            </div>
          </li>
        </ul>

      </div>
    </div>
    <div class="module-wrap">
      <div class="module-content plr15">
        <v-color v-model:color="detail.color" />
      </div>
    </div>
    <div class="module-wrap">
      <div class="module-head">
        相册
      </div>
      <div class="module-content plr15" style="min-height: 290px">
        <!-- <div>
          <ul>
            <li class="col-md-6 p5" style="height: 120px;" v-for="(item, index) in detail.img" :key="index"><img :src="item" style="width: 100%; height: 100%"></li>
          </ul>
        </div> -->
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: channelData.coding.art}" :dataList="detail.img || []" :uploadtype="channelData.module" @imgList="image" :style="'width: 135px'" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  ref,
  useRoute,
  useRouter,
  channels
} from '@/utils'
import {
  useStore
} from 'vuex'
import Source from '../../setting/source/index.vue'
// import Editor from '@/components/packages/editor/index.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Source,
    // Editor
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
    const coding: any = proxy.$coding['navigation'].single;
    const detail: any = ref({})
    let checkedList: any = ref([])
    const dataList: any = ref([])
    const channelData: any = channels();
    const aaa: any = ref([])
    const columns: any = ref([])
    const detailSSS: any = ref({})
    const upload: any = ref(null);
    const img = ref("")
    const action: any = route.path
    let menu: any = ref([{
        name: "基本信息",
        value: "appstore1"
      },
      {
        name: "自定义参数",
        value: "appstore2"
      }
    ])
    const checkField = [{
      name: 'title',
      message: "标题不能为空"
    }, {
      name: 'tag',
      message: "标签不能为空"
    }]

    // 聚合标签
    function checkbox() {
      store.dispatch('common/Fetch', {
        api: "getTagCheckbox",
        data: {
          channel_id: channelData.id,
          type: 'art'
        }
      }).then(res => {
        aaa.value = res.result
      })
    }

    function init() {
      if (action.indexOf('/edit') > -1) {
        store.dispatch('common/Fetch', {
          api: "articleDetail",
          data: {
            coding: channelData.coding.art,
            id: route.query.id
          }
        }).then(res => {
          detail.value = res.result
          let style = JSON.parse(detail.value.style || '{}')
          detail.value.style = style instanceof Object ? style : {}
          let aaa = res.result.fid.split("|")
          checkedList.value = aaa.slice(1, aaa.length - 1)
        })
      }
      store.dispatch('common/Fetch', {
        api: "getColumns",
        data: {
          channel_id: channelData.id
        }
      }).then(res => {
        const aaa: any = []
        res.result.map((item: any) => {
          detailSSS.value[item.fields] = ""

        })
        columns.value = res.result
      })

    }

    // 保存
    function save() {
      debugger
      for (let key in detailSSS.value) {
        detailSSS.value[key] = detail.value[key]
      }
      debugger
      const {
        fid,
        pid,
        title,
        checked,
        sort,
        source,
        source_url,
        background_music,
        summary_markdown,
        markdown,
        tag,
        color,
        flags,
        style
      } = detail.value

      proxy.$form.validate(detail.value, checkField, (valid: any, message: any) => {
        debugger
        if (valid) {
          proxy.$hlj.message({
            msg: message
          })
          return false
        }

        const param: any = {
          fid,
          pid,
          title,
          img: img.value,
          checked,
          sort,
          source,
          source_url,
          background_music,
          summary: summary_markdown ? marked.parse(summary_markdown) : "",
          summary_markdown,
          content: markdown ? marked.parse(markdown) : "",
          markdown,
          tag: tag ? tag.join(',') : "",
          flags: flags ? `|${flags.join("|")}|` : "",
          color: color ? `|${color.join("|")}|` : "",
          style: JSON.stringify(style),
          coding: channelData.coding.art,
        }
        if (route.query.id) {
          param.id = detail.value.id
        }

        store.dispatch('common/Fetch', {
          api: route.query.id ? 'updateArticle' : "insertArticle",
          data: {
            ...param,
            ...detailSSS.value
          }
        }).then(res => {
          proxy.$hlj.message({
            msg: res.returnMessage
          })
        })
      })
    }

    function handleClick() {
      router.push(`/admin/${channelData.module}/list`)
    }

    onMounted(() => {
      init()
      checkbox()
    })

    function getSource(param: any) {
      detail.value.source = param.source_name
      detail.value.source_url = param.source_url
    }

    // 监听图片上传
    function image(a: any) {
      debugger
      img.value = a
    }

    function handleUpdate(param: any) {
      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          serve: channelData.server,
          id: param.id,
          action: 'singleArticle',
          model: channelData.module
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "跟新成功"
        })
      })
    }

    function choose(param: any) {
      const {
        field,
        data
      } = param
      detail.value.background_music = data.id
      detail.value.music_name = data.title
    }

    return {
      coding,
      channelData,
      menu,
      detail,
      checkedList,
      init,
      save,
      dataList,
      aaa,
      handleClick,
      columns,
      detailSSS,
      getSource,
      upload,
      image,
      action,
      handleUpdate,
      choose
    }
  }
})
</script>

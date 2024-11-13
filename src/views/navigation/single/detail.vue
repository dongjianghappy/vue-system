<template>
<div class="mb10 col-md-9" style="overflow: auto; background: #fff">
  <div class="mb10">
    <div class="module-wrap">
      <div class="module-head">
        <v-optionsbar :title="action.indexOf('/add') > -1 ? '新增单页' : '编辑单页'">
          <template v-slot:extraleft>
            <span class="pointer" style="margin-top: 1px;" @click="handleClick">返回</span>
          </template>
        </v-optionsbar>
      </div>
      <div class="module-content" style="padding: 25px !important;">
        <ul class="form-wrap-box">
          <li class="vertical">
            <div class="label">名称</div>
            <div style="display: flex">
              <div style="flex: 1">
                <input id="title" v-model="detail.title" type="text" placeholder="请输入名称" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
            </div>
          </li>
          <li class="vertical">
            <div class="label">页面标题</div>
            <input id="title" v-model="detail.seotitle" type="text" placeholder="请输入页面标题" class="input-sm input-full" />
          </li>
          <li class="vertical">
            <div class="label">页面标签</div>
            <div>
              <v-tag v-model:tags="detail.keyword" />
            </div>
          </li>
          <li class="vertical">
            <div class="label">页面摘要</div>
            <div>
              <textarea placeholder="请输入单页摘要" v-model="detail.description" class="w-full"></textarea>
            </div>
          </li>
          <li class="vertical">
            <v-editor v-model:contentsss="detail.markdown" />
          </li>
          <li class="vertical">
            <div class="label">聚合标签</div>
            <div>
              <v-checkboxgroup :tagList="aaa" :checked="detail.flags" />
            </div>
          </li>
        </ul>
        <div>
          <button class="btn btn-default btn-primary" @click="save">保存</button>
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
          <input type="checkbox" v-model="status" :checked="status" class="mr5" style="float: left;"><span>显示</span></label>
        <span class="right"><button class="btn btn-default btn-primary" @click="save">保存</button></span>
        <span class="right mr10"><button class="btn btn-default btn-primary" @click="handleUpdate(detail)">生成静态</button></span>
        <span class="right mr10"><a class="btn btn-default btn-primary" :href="`http://www.${channelData.server}/${channelData.module}/${detail.id}.html`" target="_blank">预览</a></span>
      </div>
      <div class="module-content plr15">
        <ul class="form-wrap-box">
          <li class="vertical">
            <div class="label">模板</div>
            <v-select :enums="templates" v-model:value="detail.single_templates" :defaultValue="detail.single_templates = detail.single_templates ? detail.single_templates : 'singlepage.htm'" />
          </li>
          <li class="vertical">
            <div class="label">目录</div>
            <input id="title" v-model="detail.dir_file" type="text" placeholder="请输入目录" class="input-sm input-full" />
          </li>
          <li class="vertical">
            <div class="label">文件名</div>
            <input id="title" v-model="detail.html" type="text" placeholder="请输入文件名" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">是否跳转</span>
            <v-radio label="是" name="target" value="1" v-model:checked="detail.target" />
            <v-radio label="否" name="target" value="0" v-model:checked="detail.target" />
          </li>
        </ul>

      </div>
    </div>
    <div class="module-wrap">
      <div class="module-head">
        相册
      </div>
      <div class="module-content plr15" style="min-height: 290px">
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding}" :dataList="detail.img" :uploadtype="channelData.module" @imgList="image" :style="'width: 135px'" />
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
  channels,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
import {
  TEMPLATES,
} from '@/assets/enum'
// import Source from '../../setting/source.vue'
// import Editor from '@/components/packages/editor/index.vue'
export default defineComponent({
  name: 'HomeViewdd',
  components: {
    // Source,
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
    let status: any = ref(false)
    const router: any = useRouter();
    const coding: any = codings.single;
    const detail: any = ref({})
    let checkedList: any = ref([])
    const dataList: any = ref([])
    const channelData: any = channels();
    const aaa: any = ref([])
    const columns: any = ref([])
    const detailSSS: any = ref({})
    const upload: any = ref(null);
    const img: any = ref("")
    const action: any = route.path
    const templates: any = TEMPLATES
    let menu: any = ref([{
        name: "基本信息",
        value: "appstore1"
      },
      {
        name: "自定义参数",
        value: "appstore2"
      }
    ])
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
          api: "detail",
          data: {
            coding,
            id: route.query.id
          }
        }).then(res => {
          detail.value = res.result
          status.value = detail.value.status === '1' ? true : false
          let style = JSON.parse(detail.value.style || '{}')
          detail.value.style = style instanceof Object ? style : {}
          let aaa = res.result.fid.split("|")
          checkedList.value = aaa.slice(1, aaa.length - 1)
        })
      }
    }

    // 保存
    function save() {
      debugger
      for (let key in detailSSS.value) {
        detailSSS.value[key] = detail.value[key]
      }

      const {
        fid,
        pid,
        title,
        seotitle,
        sort,
        single_templates,
        dir_file,
        html,
        target,
        description,
        markdown,
        keyword,
        flags,
        style
      } = detail.value

      const param: any = {
        fid,
        pid,
        title,
        seotitle,
        img: img.value,
        status: status.value ? 1 : 0,
        sort,
        single_templates,
        dir_file,
        html,
        target,
        description,
        content: markdown ? marked.parse(markdown) : "",
        markdown,
        keyword: keyword ? keyword.join(',') : "",
        flags: flags ? `|${flags.join("|")}|` : "",
        style: JSON.stringify(style),
        coding
      }
      if (route.query.id) {
        param.id = detail.value.id
      }

      store.dispatch('common/Fetch', {
        api: route.query.id ? 'update' : "insert",
        data: {
          ...param,
          ...detailSSS.value
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    function handleClick() {
      router.push(`/admin/navigation/single?channel=${route.query.channel}`)
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
      if (detail.value.status !== '1') {
        proxy.$hlj.message({
          msg: "单页状态未开启"
        })
        return
      }
      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          serve: channelData.server,
          id: param.id,
          action: 'single',
        }
      }).then(res => {
        debugger
        proxy.$hlj.message({
          msg: "更新成功"
        })
      })
    }

    return {
      coding,
      channelData,
      menu,
      status,
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
      templates
    }
  }
})
</script>

<template>
<div class="mb10 col-md-9" style="overflow: auto; background: #fff">
  <div class="mb10">
    <div class="module-wrap">
      <div class="module-head">
        <v-optionsbar title="新增文档">
          <template v-slot:extraleft>
            <span class="pointer" style="margin-top: 1px;" @click="handleClick">返回</span>
          </template>
        </v-optionsbar>
      </div>

      <div class="module-content" style="padding: 25px !important;">
        <v-tabs :tabs="menu">
          <template v-slot:content1>
            <ul class="form-wrap-box">
              <li class="li">
                <span class="label">标题</span>
                <div style="display: flex">
                  <div style="flex: 1">
                    <input id="title" v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
                  </div>
                  <v-titleattribute :style="detail.style || {}" :setStyle="setStyle" />
                </div>
              </li>
              <li class="li">
                <span class="label">tag标签</span>
                <v-tag v-model:tags="detail.tag" />
              </li>
              <li class="li">
                <span class="label">所属导航</span>
                {{detail.parent}}
                <v-category name="选择分类" :data="{detail, coding}" type="text" api="delete"></v-category>

              </li>
              <li class="li">
                <span class="label">显示</span>
                <v-radio label="是" name="checked" value="1" v-model:checked="detail.checked" />
                <v-radio label="否" name="checked" value="0" v-model:checked="detail.checked" />
              </li>
              <li class="li">
                <span class="label">文章来源</span>
                <input type="text" v-model="detail.source" placeholder="请输入文章来源" class="input-sm input-150 mr15" />
                <input type="text" v-model="detail.source_url" placeholder="请输入来源地址" class="input-sm input-250" />
              </li>

            </ul>
            <div class="edit-article">
              <v-md-editor v-model="detail.content" height="400px"></v-md-editor>
            </div>
            <div class="summary mt20">
              <h2 class="mb15 font18">摘要</h2>
              <textarea placeholder="请输入单页摘要" v-model="detail.summary" class="w-full"></textarea>
            </div>
            <div class="summary mt20">
              <h2 class="mb15 font18">聚合标签</h2>
              <v-checkboxgroup :tagList="aaa" :checked="detail.checkboxList" />
            </div>
          </template>
          <template v-slot:content2>
            ewqe
          </template>
        </v-tabs>

        <div class="mt20">
          <button class="btn btn-default" @click="save">保存</button>
        </div>
      </div>

    </div>
  </div>
</div>
<div class="col-md-3" style="overflow: auto;">
  <div style="padding-left: 8px;">
    <div class="module-wrap">
      <div class="module-head" style="line-height: 32px;">
        分类
      </div>
      <div class="module-content plr15" style="height: 150px">
        <ul>
          <li class="mb5" v-for="(item, index) in dataList" :key="index">
            <label>
              <v-checkbox :checkedList="checkedList" :data="{ id: item.id}" className="mr5" />{{item.name}}
            </label>
            <ul class="pl15">
              <li class="mb5" v-for="(data, i) in item.list" :key="i">
                <label>
                  <v-checkbox :checkedList="checkedList" :data="{ id: data.id}" className="mr5" /> {{data.name}}
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="module-wrap">
      <div class="module-head">
        预览图
      </div>
      <div class="module-content plr15" style="height: 360px">
        <div>
          <a data-uploadtype="tech" data-temp="nineimg" class="cl-ccc" @click="uploadImg">点击上传图片</a>
          <span style=" margin-left: 25px; color:#ccc">请上传本地图片，大小不超过2MB</span>
        </div>
      </div>
    </div>
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
  useRoute,
  useRouter,
  channels
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  components: {},
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

    function cate() {
      store.dispatch('common/Fetch', {
        api: "navigation",
        data: {
          channel: 0
        }
      }).then(res => {
        dataList.value = res.result.list
      })
    }

    function init() {
      store.dispatch('common/Fetch', {
        api: "articleDetail",
        data: {
          coding: 'A0000',
          id: route.query.id
        }
      }).then(res => {
        detail.value = res.result
        let ssiss = res.result.flags.split("|")
        detail.value.checkboxList = ssiss.slice(1, ssiss.length - 1)
        let aaa = res.result.fid.split("|")
        checkedList.value = aaa.slice(1, aaa.length - 1)
      })
    }

    // 设置属性
    function setStyle(param: any) {
      detail.value.style = param
    }

    // 保存
    function save() {

      const {
        fid,
        pid,
        title,
        checked,
        sort,
        source,
        source_url,
        summary,
        content,
        checkboxList,
        style
      } = detail.value

      const param: any = {
        fid,
        pid,
        title,
        checked,
        sort,
        source,
        source_url,
        summary,
        content,
        flags: checkboxList.length > 1 ? `|${checkboxList.join("|")}|` : "",
        style: JSON.stringify(style),
        coding: "A0000",
      }
      if (route.query.id) {
        param.id = detail.value.id
      }
      // proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: route.query.id ? 'updateArticle' : "insertArticle",
        data: {
          ...param
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
      })
    }

    function handleClick() {
      router.push(`/admin/${channelData.module}/list`)
    }

    onMounted(() => {
      init()
      checkbox()
      cate()
    })

    return {
      coding,
      menu,
      detail,
      checkedList,
      init,
      setStyle,
      save,
      dataList,
      aaa,
      handleClick
    }
  }
})
</script>

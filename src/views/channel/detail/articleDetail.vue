<template>
<v-button v-model:show="isShow" :disabled="auth">
  <template v-if="name">{{name}}</template>
  <template v-else>
  <i class="iconfont icon-anonymous-iconfont" v-if="action === 'add'" />{{action === 'edit'? "编辑": "新增文档"}}
  </template>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑文档' : '新增文档' " drafts="true" api="articleDetail" :data="{...data, coding: data.coding.art || data.coding}" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="tabsDetail" method="click">
      <template v-slot:extra>
        <Extra :data="detail" :channel="data.channel" :action="action" />
      </template>
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">标题</span>
            <div style="display: flex">
              <div style="flex: 1">
                <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
            </div>
          </li>
          <li class="li">
            <span class="label">标签</span>
            <v-tag v-model:tags="detail.tag" />
          </li>
          <li class="li">
            <span class="label">来源方式</span>
            <v-radiobutton name="method" v-model:checked="detail.method" :enums="[{label: 'AI生成', value: '0'}, {label: '网络分享', value: '1'}, {label: '原创', value: '2'}, {label: '投稿', value: '3'}]" />
          </li>
          <li class="li" v-if="detail.method === '1'">
            <span class="label">内容来源</span>
            <div class="flex">
              <input type="text" v-model="detail.source" placeholder="请输入来源名称" class="input-sm mr10">
              <input type="text" v-model="detail.source_url" placeholder="请输入来源地址" class="input-sm input-full">
            </div>
          </li>
          <li class="li">
            <span class="label">所属分类</span>
            <span class="mr10">{{detail.parent}}</span>
            <v-category name="选择分类" :data="{item: detail, coding: data.coding}" :isMore="true" type="text"></v-category>
          </li>
          <li class="li">
            <span class="label">同步到平台</span>
            <v-checkboxgroup :tagList="syncPlatfrom" :checked="detail.sync" />
          </li> 
          <li style="padding-left: 100px;">
              <ul style="background: rgb(248, 248, 250);">
                  <li class="vertical">
                      <textarea placeholder="公众号文章链接" v-model="detail.sync_article_url" class="w-full"></textarea>
                  </li>
              </ul>
          </li>
          <li class="li">
            <span class="label">图片方式</span>
            <v-radiobutton name="image_type" v-model:checked="detail.image_type" :enums="[{label: '上传', value: '0'}, {label: '生成', value: '1'}]" />
          </li>          
          <li class="li" style="overflow: auto;">
            <span class="label">图片</span>
            <v-createimage :detail="detail" @image="getImage" v-if="detail.image_type === '1'" />
            <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding.art}" :dataList="detail.img || []" :uploadtype="data.channel.module" @imgList="image" :style="'width: 135px'" v-else />
          </li>
          <li class="li">
            <span class="label">描述</span>
            <textarea placeholder="请输入描述" v-model="detail.description" class="w-full"></textarea>
          </li>
          <li class="li">
            <span class="label">摘要说明</span>
            <v-editordesc v-model:contentsss="detail.summary_markdown" :data="detail" />
          </li>
          <li class="li">
            <span class="label">内容</span>
            <v-editor v-model:contentsss="detail.markdown" :detail="detail" />
          </li>
          <li class="li">
            <span class="label">聚合标签</span>
            <v-checkboxgroup :tagList="flagList" :checked="detail.flags" />
          </li>
          <li class="li">
            <span class="label">用户</span>
            <span class="mr10">{{detail.nickname}}</span>
            <v-chooseuser title="选择用户" :data="{ item: detail, field: 'fid', coding }" v-model:checked="detail.fid" @chooseUser="chooseUser" type="radio" />
          </li>
        </ul>
      </template>
      <template v-slot:content2>
        <Customize :data="detail" :dataList="columnsList" />
      </template>
    </v-tabs>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineProps,
  ref,
  useStore,
  watch,
  computed,
  useProps,
  codings
} from '@/utils'
import { customize11, checkbox, channleSubmit, articleTempList } from '@/utils/fn'
import {
  tabsDetail,
  syncPlatfrom
} from '@/assets/const/index'
import Customize from '../components/customize.vue'
import Extra from '../components/extra.vue'
  const props: any = defineProps(useProps)
    const store = useStore()
    const coding = codings.user.list
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    const img: any = ref("")
    const draw_img: any = ref("")
    const flagList: any = ref([])
    const customizeDetail: any = ref({})
    const columnsList: any = ref([])
    const page = computed(() => store.getters['common/page']);

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        // 初始化数据
        detail.value = await drawer.value.init()
        // 获取聚合标签
        flagList.value = await checkbox({store})
        // 自定义字段数据获取
        const columns: any = await customize11({
          store,
          channel_id: props.data.channel.id
        })
        customizeDetail.value = columns.customizeDetail
        columnsList.value = columns.list
        
        let style = JSON.parse(detail.value.style || '{}')
        detail.value.style = style instanceof Object ? style : {}
      }
    })

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function getImage(param: any){
      debugger
      detail.value.img = param.src
      detail.value.draw_image = param.src
      draw_img.value = param.src
      detail.value.draw_config = param.config
    }

    function chooseUser(param: any) {
      const {
        data
      } = param
      detail.value.uid = data.account
      detail.value.nickname = data.nickname
    }

    function submit(params: any) {
      const {
        summary_markdown,
        markdown,
        image_type,
        draw_config,
        sync,
        sync_article_url
      } = detail.value

      channleSubmit({
        store,
        props,
        detail: detail.value,
        customizeDetail: customizeDetail.value,
        data: {
          summary: summary_markdown ? marked.parse(summary_markdown) : "",
          summary_markdown,
          content: markdown ? marked.parse(markdown) : "",
          markdown,
          draw_img: draw_img.value,
          image_type,
          draw_config,
          img: img.value,
          sync: sync ? `|${sync.join("|")}|` : "",
          sync_article_url
        },
        callback: () => {
          props.render({
            page: page.value
          })
          isShow.value = false
        }
      })
    }
</script>

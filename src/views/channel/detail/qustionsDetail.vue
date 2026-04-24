<template>
<v-button v-model:show="isShow" :disabled="auth">
  <template v-if="name">{{name}}</template>
  <template v-else>
    <i class="iconfont icon-anonymous-iconfont" v-if="action === 'add'" />{{action === 'edit'? "编辑": "新增问题"}}
  </template>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑好站' : '新增问题' " drafts="true" api="articleDetail" :data="{...data, coding: data.coding.art}" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="tabsDetail" method="click">
      <template v-slot:extra>
        <Extra :data="detail" :channel="data.channel" :action="action" />
      </template>
      <template v-slot:content1>
        <ul class="form-wrap-box">
            <li class="vertical">
              <textarea v-model="detail.title" class="w-full font24" placeholder="请输入问题" maxlength="30"
                    style="border-top: none; border-right: none; border-bottom: 1px solid rgb(238, 238, 238); border-left: none; border-image: initial; resize: inherit;"></textarea>
            </li>
            <li class="vertical mb25">
                <v-tag v-model:tags="detail.tag" />
            </li>
            <li class="vertical mb25">
                {{detail.parent}}
                <v-category name="选择分类" :data="{item: detail, coding: data.coding}" :isMore="true" type="text"></v-category>
            </li>
            <li class="vertical mb25">
              <textarea v-model="detail.description" class="w-full bd-0 h150 bg-f7f8fa font18" placeholder="请输入问题描述" maxlength="250" ></textarea>
            </li>
            <li class="vertical">
                <v-editor v-model:contentsss="detail.markdown" :data="detail" :coding="data.coding.art" />
            </li>
            <li class="vertical">
                <div class="label">附件上传（复制图片地址到编辑器图片插入进行替换）</div>
                <v-upload ref="upload" @imgList="image" uploadtype="questions" maxLength="3" />
                <span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>
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
  useProps
} from '@/utils'
import { customize11, checkbox, channleSubmit } from '@/utils/fn'
import {
  tabsDetail
} from '@/assets/const/index'
import Extra from '../components/extra.vue'
  const props: any = defineProps(useProps)
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    const img: any = ref("")
    const flagList: any = ref([])
    const customizeDetail: any = ref({})
    const columnsList: any = ref([])
    const websiteInfo: any = ref({})

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

    function handleGetSiteInfo(){
      store.dispatch('common/Fetch', {
        api: "getWebsiteInfo",
        data: {
          url: detail.value.url
        }
      }).then(res => {
        websiteInfo.value = res.result
      })
    }

    function handleGetClear(){
      websiteInfo.value = {}
    }

    // 监听好站上传
    function image(a: any) {
      img.value = a
    }

    function choose(param: any) {
      const {
        data
      } = param
      detail.value.background_music = data.id
      detail.value.music_name = data.title
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
        markdown
      } = detail.value

      channleSubmit({
        store,
        props,
        detail: detail.value,
        img: img.value,
        customizeDetail: customizeDetail.value,
        data: {
          content: markdown ? marked.parse(markdown) : "",
          markdown
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

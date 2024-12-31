<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-anonymous-iconfont" v-if="action === 'add'" />{{action === 'edit'? "编辑": "添加好站"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑好站' : '添加好站' " api="articleDetail" :data="{...data, coding: data.coding.art}" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="tabsDetail" method="click">
      <template v-slot:extra>
        <Extra :data="detail" />
      </template>
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">网站名称</span>
            <div style="display: flex">
              <div style="flex: 1">
                <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
            </div>
            {{websiteInfo.title}}
          </li>
          <li class="li">
            <span class="label">网站地址</span>
            <div style="display: flex">
              <div style="flex: 1">
            <input v-model="detail.url" type="text" placeholder="请输入地址" class="input-sm input-full" />
              </div>
              <div class="w80 pl15">
                <span class="mr10" @click="handleGetSiteInfo">检索</span>
                <span @click="handleGetClear">清空</span>
              </div>
            </div>
          </li>
          <li class="li">
            <span class="label">网站标签</span>
            <v-tag v-model:tags="detail.tag" />
            {{websiteInfo.keywords}}
          </li>
          <li class="li">
            <span class="label">所属分类</span>
            <span class="mr10">{{detail.parent}}</span>
            <v-category name="选择分类" :data="{item: detail, coding: data.coding.cate}" :isMore="true" type="text"></v-category>
          </li>
          <li class="li">
            <span class="label">摘要</span>
            <textarea placeholder="请输入单页摘要" v-model="detail.summary" class="w-full"></textarea>
            {{websiteInfo.description}}
          </li>
          <li class="li" style="overflow: auto;">
            <span class="label">图片</span>
            <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding.art}" :dataList="detail.img || []" uploadtype="website" @imgList="image" :style="'width: 135px'" />
          </li>
          <li class="li">
            <span class="label">聚合标签</span>
            <div>
              <v-checkboxgroup :tagList="flagList" :checked="detail.flags" />
            </div>
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
  defineProps,
  ref,
  useStore,
  watch,
  computed,
  channels,
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
    const channelData: any = channels();
    const websiteInfo: any = ref({})

    const page = computed(() => store.getters['common/page']);

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        flagList.value = await checkbox({store}) // 获取聚合标签
        // 自定义字段数据获取
        const columns: any = await customize11({
          store,
          channel_id: channelData.id
        })
        customizeDetail.value = columns.customizeDetail
        columnsList.value = columns.list

        if (props.action === 'edit') {
          let style = JSON.parse(detail.value.style || '{}')
          detail.value.style = style instanceof Object ? style : {}
        } else {
          detail.value.style = {}
          detail.value.cateList = []
          detail.value.color = []
        }
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

    function submit(params: any) {
      channleSubmit({
        store,
        props,
        detail: detail.value,
        img: img.value,
        customizeDetail: customizeDetail.value,
        callback: () => {
          props.render({
            page: page.value
          })
          isShow.value = false
        }
      })
    }
</script>

<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-anonymous-iconfont" v-if="action === 'add'" />{{action === 'edit'? "编辑": "新增文档"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑文档' : '新增文档' " api="articleDetail" :data="{...data, coding: data.coding.art}" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="tabsDetail" method="click">
      <template v-slot:extra>
        <Extra :data="detail" :action="action" />
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
          <li class="li">
            <span class="label">内容来源</span>
            <div class="flex">
              <input type="text" v-model="detail.source" placeholder="请输入来源名称" class="input-sm mr10">
              <input type="text" v-model="detail.source_url" placeholder="请输入来源地址" class="input-sm input-full">
            </div>

          </li>
          <li class="li">
            <span class="label">所属分类</span>
            <span class="mr10">{{detail.parent}}</span>
            <v-category name="选择分类" :data="{item: detail, coding: data.coding.cate}" :isMore="true" type="text"></v-category>
          </li>
          <li class="li" style="overflow: auto;">
            <span class="label">图片</span>
            <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding.art}" :dataList="detail.img || []" uploadtype="picture" @imgList="image" :style="'width: 135px'" />
          </li>
          <li class="li">
            <span class="label">描述</span>
            <div>
              <textarea placeholder="请输入单页描述" v-model="detail.description" class="w-full"></textarea>
            </div>
          </li>
          <li class="li">
            <span class="label">内容</span>
            <v-editor v-model:contentsss="detail.markdown" :data="detail" />
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
import Customize from '../components/customize.vue'
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

    // 监听图片上传
    function image(a: any) {
      img.value = a
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

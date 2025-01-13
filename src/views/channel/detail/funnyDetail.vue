<template>
<v-button v-model:show="isShow" :disabled="auth">
  <template v-if="name">{{name}}</template>
  <template v-else>
    <i class="iconfont icon-anonymous-iconfont" v-if="action === 'add'" />{{action === 'edit'? "编辑": "新增内容"}}
  </template>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑内容' : '新增内容' " drafts="true" api="articleDetail" :data="{...data, coding: data.coding.art}" :render="render" :submit="submit">
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
              <textarea placeholder="请输入描述" v-model="detail.description" class="w-full"></textarea>
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
import { customize11, checkbox, channleSubmit, articleTempList } from '@/utils/fn'
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

    function submit(params: any) {
      const {
        summary,
        markdown
      } = detail.value

      channleSubmit({
        store,
        props,
        detail: detail.value,
        customizeDetail: customizeDetail.value,
        data: {
          summary,
          content: markdown ? marked.parse(markdown) : "",
          markdown,
          img: img.value,
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

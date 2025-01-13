<template>
<v-button v-model:show="isShow" :disabled="auth">
  <template v-if="name">{{name}}</template>
  <template v-else>
    <i class="iconfont icon-anonymous-iconfont" v-if="action === 'add'" />{{action === 'edit'? "编辑": "新增网站"}}
  </template>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑网站' : '新增网站'" drafts="true" api="articleDetail" :data="{...data, coding: data.coding.art}" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="tabsDetail" method="click">
      <template v-slot:extra>
        <Extra :data="detail" :channel="data.channel" :action="action" />
      </template>
      <template v-slot:content1>
        <ul class="form-wrap-box">
            <li class="li">
              <span class="label">网站名称</span>
              <input v-model="detail.title" type="text" placeholder="请输入网站名称" class="input-sm input-full" />
            </li>
            <li class="li">
              <span class="label">网站地址</span>
              <input v-model="detail.url" type="text" placeholder="请输入网站地址" class="input-sm input-full" />
            </li>
            <li class="li">
              <span class="label">所属区域</span>
              <v-select :enums="PRIOVINCE" v-model:value="detail.province" :defaultValue="detail.source = detail.source ? detail.source : '5'" />
            </li>
            <li class="li">
              <span class="label">网站类型</span>
              {{detail.parent}}
              <v-category name="选择分类" :data="{item: detail, coding: data.cate}" :isMore="true" type="text"></v-category>
            </li>
            <li class="li">
              <span class="label">站长联系方式:</span>
              <input v-model="detail.contact" type="text" placeholder="请输入站长联系方式" class="input-sm input-full" />
            </li>
            <li class="li">
              <span class="label">网站简介</span>
              <textarea placeholder="请输入网站简介" v-model="detail.summary" class="w-full"></textarea>
            </li>
            <li class="li">
              <span class="label">第二网站名称</span>
              <input v-model="detail.second_title" type="text" placeholder="请输入网站名称" class="input-sm input-full" />
            </li>
            <li class="li">
              <span class="label">第二网站地址</span>
              <input v-model="detail.second_url" type="text" placeholder="请输入网站地址" class="input-sm input-full" />
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

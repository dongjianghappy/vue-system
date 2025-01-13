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
        <ul class="form-wrap-box" style="height: 560px;">
          <li class="vertical">
            <textarea v-model="detail.title" class="w-full font24" placeholder="请输入问题" maxlength="30" style="border: none; border-bottom: 1px solid #eee; resize: inherit;"></textarea>
          </li>
          <li class="vertical">
            <textarea v-model="detail.summary" class="w-full" placeholder="请输入描述(必填)" style="border: none; resize: inherit;"></textarea>
          </li>
          <li class="vertical">
            <div class="label">附件上传</div>
            <v-upload ref="upload" @imgList="image" uploadtype="questions" :show="true" maxLength="3" />
            <span class="mt5 font12">{{`共${imgNum}张，还可以上传${3-imgNum}张`}}</span>
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

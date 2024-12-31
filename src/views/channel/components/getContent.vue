<template>
<v-button v-model:show="isShow" :disabled="auth">
  网络分享
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" title="第三方内容提取" :style="{width: 500}" :submit="submit">
  <template v-slot:extra>
    <Source :data="detail" />
  </template>
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">来源地址</span>
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
        <span class="label">标题</span>
        <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">标签</span>
        <v-tag v-model:tags="detail.tag" />
      </li>
      <li class="li">
        <span class="label">描述</span>
        <div>
          <textarea placeholder="请输入单页描述" v-model="detail.description" class="w-full"></textarea>
        </div>
      </li>
    </ul>
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
import Source from './source.vue'
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

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
      
      }
    })

    function handleGetSiteInfo(){
      store.dispatch('common/Fetch', {
        api: "getWebsiteContent",
        data: {
          url: detail.value.url
        }
      }).then(res => {
        detail.value = res.result
      })
    }

    function handleGetClear(){
      detail.value = {}
    }

    function submit(params: any) {
      debugger
      props.data.title = detail.value.title
      props.data.tag = detail.value.tag
      props.data.description = detail.value.description
      props.data.method = '1'
      props.data.source_url = detail.value.url
      isShow.value = false
    }
</script>

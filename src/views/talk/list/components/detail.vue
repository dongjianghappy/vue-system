<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont icon-anonymous-iconfont" v-if="action === 'add'" />{{action === 'edit'? "编辑": "新增文档"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑文档' : '新增文档' " :data="{...data, coding: data.coding}" :render="render" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <span class="mt5">
        <VoteSetting :data="detail" />
      </span>
      <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
        <input type="checkbox" v-model="detail.checked" :checked="detail.checked" class="mr5" style="float: left;"><span>显示</span>
      </label>
      <v-visible v-model:visible="detail.visible" />
    </v-space>
  </template>   
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">微博内容</span>
        <div>
          <textarea placeholder="请输入微博内容" v-model="detail.summary" class="w-full"></textarea>
        </div>
      </li>
      <li class="li">
        <span class="label">所属分类</span>
        <span class="mr10">{{detail.parent}}</span>
        <v-category name="选择分类" :data="{item: detail, coding: data.coding.cate}" :isMore="true" type="text"></v-category>
      </li>
      <li class="li">
        <span class="label">允许下载</span>
        <v-radiobutton name="isdownload" v-model:checked="detail.isdownload" :enums="[{label: '允许', value: '1'}, {label: '不允许', value: '0'}]" />
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">图片</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding.art}" :dataList="detail.img || []" uploadtype="picture" @imgList="image" :style="'width: 135px'" />
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
  useProps,
  codings
} from '@/utils'
import VoteSetting from '@/views/module/vote/components/setting.vue'
import { customize11, checkbox, channleSubmit } from '@/utils/fn'
import {
  tabsDetail
} from '@/assets/const/index'
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

    function submit(cancel: any) {
      const {
        id,
        summary,
        isdownload,
        visible,
        checked
      } = detail.value

      const param: any = {
        singer_id: props.data.singer_id,
        summary,
        isdownload,
        visible,
        img: img.value,
        checked
      }
      debugger
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: 'update',
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }
</script>

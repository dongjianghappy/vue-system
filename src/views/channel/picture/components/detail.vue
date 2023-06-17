<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-anonymous-iconfont" v-if="action === 'add'" />{{action === 'edit'? "编辑": "上传图片"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑图片' : '上传图片' " api="articleDetail" :data="{...data, coding: coding.art}" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">

    <v-tabs :tabs="[{
        name: '基本信息',
        value: 'appstore1'
      },
      {
        name: '自定义参数',
        value: 'appstore2'
      }
    ]" method="click">
      <template v-slot:extra>

      </template>
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">图片名称</span>
            <div style="display: flex">
              <div style="flex: 1">
                <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
            </div>
          </li>
          <li class="li">
            <span class="label">显示</span>
            <v-radio label="是" name="checked" value="1" v-model:checked="detail.checked" />
            <v-radio label="否" name="checked" value="0" v-model:checked="detail.checked" />
          </li>
          <li class="li">
            <span class="label">标签</span>
            <v-tag v-model:tags="detail.tag" />
          </li>
          <li class="li">
            <span class="label">所属分类</span>
            <span class="mr10">{{detail.parent}}</span>
            <v-category name="选择分类" :data="{item: detail, coding: coding.cate}" :isMore="true" type="text"></v-category>

          </li>
          <li class="li">
            <span class="label">摘要</span>
            <textarea placeholder="请输入单页摘要" v-model="detail.summary" class="w-full"></textarea>
          </li>
          <li class="li" style="height: 135px">
            <span class="label">颜色</span>
            <div>
              <v-color v-model:color="detail.color" col="col-md-2" />
            </div>
          </li>
          <li class="li" style="overflow: auto;">
            <span class="label">图片</span>
            <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding:coding.art}" :dataList="detail.img || []" uploadtype="picture" @imgList="image" :style="'width: 135px'" />
          </li>
          <li class="li">
            <span class="label">背景音乐</span>
            <span>
              {{detail.music_name}}
              <v-choose title="选择音乐" :data="{ item: detail, field: 'singer' }" coding="E0000" @choose="choose" type="radio" api="articleList" />
            </span>
          </li>
          <li class="li">
            <span class="label">聚合标签</span>
            <div>
              <v-checkboxgroup :tagList="aaa" :checked="detail.flags" />
            </div>
          </li>
        </ul>
      </template>
      <template v-slot:content2>
        <ul class="form-wrap-box">
          <template v-for="(item, index) in columns" :key="index">
            <li class="vertical">
              <div class="label">{{item.remark}}</div>
              <div>
                <input v-model="detail[item.fields]" type="text" class="input-sm input-full" v-if="item.text_type === 'input'" />
                <textarea v-model="detail[item.fields]" class="w-full" v-else-if="item.text_type === 'textarea'"></textarea>
              </div>
            </li>
          </template>
        </ul>
      </template>
    </v-tabs>

    <div class="mb15" style="overflow: hidden;" v-if="coding.art === 'K0007'">
      <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: 'K0007'}" :dataList="detail.img || []" uploadtype="design" @imgList="image" :style="'width: 135px'" />
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
  computed,
  channels
} from '@/utils'
import {
  COLOR
} from '@/assets/common_const'
export default defineComponent({
  name: 'v-Search',
  components: {},
  props: {
    action: {
      type: String,
      default: "add"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    coding: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    auth: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    const aaa: any = ref([])
    const img = ref("")
    const colorList = COLOR
    const columns: any = ref([])
    const detailSSS: any = ref({})
    const channelData: any = channels();

    const page = computed(() => store.getters['common/page']);

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        checkbox()
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

    // 上传图片
    function uploadImg() {
      upload.value.handleclick()
    }

    // 聚合标签
    function checkbox() {
      store.dispatch('common/Fetch', {
        api: "getColumns",
        data: {
          channel_id: channelData.id
        }
      }).then(res => {
        const aaa: any = []
        res.result.map((item: any) => {
          detailSSS.value[item.fields] = ""

        })
        columns.value = res.result
      })

      store.dispatch('common/Fetch', {
        api: "getTagCheckbox",
        data: {
          channel_id: '1',
          type: 'art'
        }
      }).then(res => {
        aaa.value = res.result
      })
    }

    // 监听图片上传
    function image(a: any) {
      debugger
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
      for (let key in detailSSS.value) {
        detailSSS.value[key] = detail.value[key]
      }

      const {
        id,
        fid,
        title,
        background_music,
        summary,
        tag,
        flags,
        color,
        style,
        checked
      } = detail.value
      const param: any = {
        fid,
        title,
        img: img.value,
        background_music,
        summary,
        tag: tag ? tag.join(',') : "",
        flags: flags ? `|${flags.join("|")}|` : "",
        color: color ? `|${color.join("|")}|` : "",
        style: JSON.stringify(style),
        checked
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'updateArticle' : 'insertArticle',
        data: {
          coding: props.coding.art,
          ...param,
          ...detailSSS.value
        }
      }).then(() => {
        debugger
        props.render({
          page: page.value
        })
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      drawer,
      uploadImg,
      upload,
      submit,
      aaa,
      image,
      colorList,
      page,
      choose,
      columns
    }
  }
})
</script>

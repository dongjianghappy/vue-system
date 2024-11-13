<template>
<v-button v-model:show="isShow" :disabled="auth">
 
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增内容"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑内容' : '新增内容' " api="articleDetail" :data="{...data, coding: data.coding.art}" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">标题</span>
        <textarea placeholder="请输入内容" v-model="detail.content" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="checked" value="1" v-model:checked="detail.checked" />
        <v-radio label="否" name="checked" value="0" v-model:checked="detail.checked" />
      </li>
      <li class="li">
        <span class="label">tag标签</span>
        <v-tag v-model:tags="detail.tag" />
      </li>
      <li class="li">
        <span class="label">所属分类</span>
        {{detail.parent}}
        <v-category name="选择分类" :data="{item: detail, coding: data.coding.cate}" :isMore="true" type="text"></v-category>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'
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
    const img: any = ref("")

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

    function submit(params: any) {
      const {
        id,
        fid,
        content,
        tag,
        flags,
        style,
        checked
      } = detail.value
      const param: any = {
        fid,
        content,
        tag: tag ? tag.join(',') : "",
        flags: flags ? `|${flags.join("|")}|` : "",
        style: JSON.stringify(style),
        checked
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'updateArticle' : 'insertArticle',
        data: {
          coding: props.data.coding.art,
          ...param
        }
      }).then(() => {
        props.render()
        params.message()
        params.cancel()
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
      image
    }
  }
})
</script>

<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增内容"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑内容' : '新增内容' " :data="{...data, coding: coding.art}" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="pt50 hide" style="text-align: center;">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="file" v-model:file="fileInfo" uploadtype="file" format=".js" />
    </div>
    <ul class="form-wrap-box">
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
        <v-category name="选择分类" :data="{item: detail, coding: coding.cate}" :isMore="true" type="text"></v-category>
      </li>
      <li class="li">
        <span class="label">答案</span>
        <textarea placeholder="请输入答案" v-model="detail.answer" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">解析说明</span>
        <textarea placeholder="请输入解析说明" v-model="detail.description" class="w-full"></textarea>
      </li>
    </ul>
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.markdown" :data="detail" />
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  marked
} from 'marked';
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
    const fileInfo: any = ref({})
    const detail: any = ref({})
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        if (props.action === 'edit') {
          let style = JSON.parse(detail.value.style || '{}')
          detail.value.style = style instanceof Object ? style : {}
        } else {
          detail.value.style = {}
        }
      }
    })

    // 监听
    watch([() => fileInfo.value.fileUrl], async (newValues: any, prevValues) => {
      debugger
      setTimeout(() => {
        
        detail.value.title = fileInfo.value.name.substring(0, fileInfo.value.name.lastIndexOf("."))
      }, 10)
    })

    function submit(params: any) {
      const {
        id,
        fid,
        title,
        markdown,
        answer,
        description,
        tag,
        checked
      } = detail.value
      const param: any = {
        fid,
        title,
        content: markdown ? marked.parse(markdown) : "",
        markdown,
        answer,
        description,
        tag: tag ? tag.join(',') : "",
        checked
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.coding.art,
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
      submit,
      upload,
      fileInfo
    }
  }
})
</script>

<template>
<v-button v-model:show="isShow" :disabled="auth || disabled">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增分类"}}
</v-button>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑分类' : '新增分类' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="menu" method="click">
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">

            <span class="label">分类名称</span>
            <div style="display: flex">
              <div style="flex: 1">
                <input v-model="detail.name" type="text" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <div style="flex: 1">
                <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
              </div>
              <div>
                <button class="btn btn-default btn-primary" @click="handleUpdate(detail)">生成静态</button>
              </div>
            </div>
          </li>
          <li class="li">
            <span class="label">所属分类</span>
            {{detail.parent}}
            <v-category name="选择分类" :data="{item: detail, ...data}" :isMore="true" type="text"></v-category>
          </li>
          <li class="li">
            <span class="label">顺序</span>
            <input v-model="detail.sort" type="text" class="input-sm input-150" />
          </li>
          <li class="li">
            <span class="label">显示</span>
            <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
            <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
          </li>
          <li class="li">
            <span class="label">分类路径</span>
            <input v-model="detail.dir_file" type="text" class="input-sm input-full" />
          </li>
          <li class="li" style="overflow: auto;">
            <span class="label">预览图</span>
            <SpaceModal v-model:image="detail.image">
              <span class="right">选择图片</span>
            </SpaceModal>
            <img width="398" height="150" :src="detail.image">
          </li>
        </ul>
      </template>
      <template v-slot:content2>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">频道模板</span>
            <v-select :enums="templates" v-model:value="detail.channel_templates" :defaultValue="detail.channel_templates = detail.channel_templates ? detail.channel_templates : 'index_article.htm'" />
          </li>
          <li class="li">
            <span class="label">列表模板</span>
            <v-select :enums="templates" v-model:value="detail.list_templates" :defaultValue="detail.list_templates = detail.list_templates ? detail.list_templates : 'list_article.htm'" />
          </li>
          <li class="li">
            <span class="label">内页模板</span>
            <v-select :enums="templates" v-model:value="detail.arcticle_templates" :defaultValue="detail.arcticle_templates = detail.arcticle_templates ? detail.arcticle_templates : 'article_article.htm'" />
          </li>
          <li class="li">
            <span class="label">SEO标题</span>
            <input v-model="detail.seotitle" type="text" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">关键词</span>
            <v-tag v-model:tags="detail.keyword" />
          </li>
          <li class="li">
            <span class="label">描述</span>
            <textarea v-model="detail.description"></textarea>
          </li>
        </ul>
      </template>
    </v-tabs>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  useStore,
  channels,
  jsonParse
} from '@/utils'
import {
  TEMPLATES,
} from '@/assets/enum'
import SpaceModal from '../../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Detail',
  components: {
    SpaceModal
  },
  props: {
    attrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
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
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
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
    },
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const channelData: any = channels();
    const templates: any = TEMPLATES
    const store = useStore();
    const aaa: any = ref([])

    let menu: any = ref([{
        name: "分类信息",
        value: "appstore1"
      },
      {
        name: "页面信息",
        value: "appstore2"
      }
    ])
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

    // 保存
    function submit() {
      const {
        style,
        flags,
        keyword
      } = detail.value

      store.dispatch('common/Fetch', {
        api: props.action === 'edit' ? 'update' : "insert",
        data: {
          ...props.data,
          ...detail.value,
          keyword: keyword && keyword.join(',') || "",
          flags: flags ? `|${flags.join("|")}|` : "",
          style: JSON.stringify(style),
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.returnMessage
        })
        props.render()
      })
    }

    // 生成静态
    function handleUpdate(param: any) {
      store.dispatch('common/Fetch', {
        api: "updateStatic",
        data: {
          serve: channelData.server,
          id: param.id,
          action: 'singleCate',
          model: "code"
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "跟新成功"
        })
      })
    }

    return {
      isShow,
      detail,
      drawer,
      menu,
      templates,
      aaa,
      submit,
      jsonParse,
      handleUpdate
    }
  }
})
</script>

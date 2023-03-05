<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? "编辑": "新增导航"}}
</v-button>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑导航' : '新增导航' " :data="data" api="navigationDetail" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="alert-description ptb10 plr15">说明</div>
    <v-tabs :tabs="menu" method="click">
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">导航名称</span>
            <div style="display: flex">
              <div style="flex: 1">
                <input v-model="detail.name" type="text" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
            </div>
          </li>
          <li class="li">
            <span class="label">导航连接</span>
            <input v-model="detail.url" type="text" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">所属导航</span>
            {{detail.parent}}
            <v-category name="选择分类" :data="{item: detail, coding: data.coding}" :isInt="true" type="text"></v-category>
          </li>
          <li class="li">
            <span class="label">频道选择</span>
            <v-select :enums="channel" v-model:value="detail.module" :defaultValue="detail.module = detail.module ? detail.module : 'source'" @onChange="()=>{cateList = [], tagList = [], articleList = []}" />
          </li>
          <li style="padding-left: 100px;">
            <ul class="p15" style="background: rgb(248, 248, 250);">
              <li class="vertical">
                <ChooseCate :data="data" :render="init" :cateList="cateList" @getCate="getCate" :module="detail.module" />

              </li>
            </ul>
          </li>
          <li class="pt5" style="padding-left: 100px;">
            <ul class="p15" style="background: rgb(248, 248, 250);">
              <li class="vertical">
                <ChooseTag :data="data" :render="init" :tagList="tagList" @getTag="getTag" :module="detail.module" />

              </li>
            </ul>
          </li>
          <li class="pt5" style="padding-left: 100px;">
            <ul class="p15" style="background: rgb(248, 248, 250);">
              <li class="vertical">
                <ChooseArticle :data="data" :render="init" :articleList="articleList" @getArticle="getArticle" :module="detail.module" />
              </li>
            </ul>
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
            <span class="label">是否跳转</span>
            <v-radio label="是" name="target" value="1" v-model:checked="detail.target" />
            <v-radio label="否" name="target" value="0" v-model:checked="detail.target" />
          </li>
          <li class="li">
            <span class="label">类型</span>
            <v-select :enums="navType" v-model:value="detail.navtype" :defaultValue="detail.navtype = detail.navtype ? detail.navtype : 'main'" />
          </li>
          <li class="li">
            <span class="label">展示更多中</span>
            <v-radio label="否" name="more_navigation" value="0" v-model:checked="detail.more_navigation" />
            <v-radio label="是" name="more_navigation" value="1" v-model:checked="detail.more_navigation" />
          </li>
          <li class="li">
            <span class="label">聚合标签</span>
            {{detail.flags}}
            <v-checkboxgroup :tagList="checkboxList" :checked="detail.flags" />
          </li>

        </ul>
      </template>
      <template v-slot:content2>
        <ul class="form-wrap-box">
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
            <textarea v-model="detail.description" class="w-full"></textarea>
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
  ref,
  watch,
  useStore,
  computed
} from '@/utils'
import {
  NAV_TYPE,
} from '@/assets/enum'
import ChooseCate from './chooseCate.vue'
import ChooseTag from './chooseTag.vue'
import ChooseArticle from './chooseArticle.vue'
export default defineComponent({
  name: 'v-Detail',
  components: {
    ChooseCate,
    ChooseTag,
    ChooseArticle
  },
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
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
    },
    checkboxList: {
      type: Array,
      default: []
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    siteList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const navType: any = NAV_TYPE
    const cateList: any = ref([])
    const tagList: any = ref([])
    const articleList: any = ref([])
    const menu: any = ref([{
        name: "导航信息"
      },
      {
        name: "页面信息"
      }
    ])
    const detail: any = ref({})
    const channel = computed(() => {
      const enums = store.getters['user/channel'].map((item: any) => {
        return {
          name: item.name,
          value: item.module
        }
      })
      return enums
    });

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        cateList.value = detail.value.cateList || []
        articleList.value = detail.value.articleList || []
        if (props.action === 'edit') {
          let style = JSON.parse(detail.value.style)
          detail.value.style = style instanceof Object ? style : {}
        } else {
          detail.value.style = {}
        }
      }
    })

    function getCate(param: any) {
      debugger
      let arr = cateList.value.filter((item: any) => item.id === param.id)

      if (arr.length > 0) {
        return
      }

      cateList.value.push({
        id: param.id,
        name: param.name
      })
    }

    function getTag(param: any) {
      debugger
      let arr = tagList.value.filter((item: any) => item.id === param.id)

      if (arr.length > 0) {
        return
      }

      tagList.value.push({
        id: param.id,
        name: param.name
      })
    }    

    function getArticle(param: any) {
      debugger
      let index = articleList.value.findIndex((item: any) => item.id === param.id)
      if (index > -1) {
        articleList.value.splice(index, 1)
      } else {
        articleList.value.push({
          id: param.id,
          title: param.title
        })
      }
    }

    // 保存
    function submit(params: any) {
      const {
        style,
        flags,
        keyword
      } = detail.value

      const cateArr: any = []
      cateList.value.map((item: any) => {
        cateArr.push(item.id)
      })

      const tagArr: any = []
      tagList.value.map((item: any) => {
        tagArr.push(item.id)
      })      

      const artArr: any = []
      articleList.value.map((item: any) => {
        artArr.push(item.id)
      })

      store.dispatch('common/Fetch', {
        api: props.action === 'edit' ? 'update' : "insert",
        data: {
          ...props.data,
          ...detail.value,
          cate_id: cateArr.join(','),
          tag_id: tagArr.join(','),
          artid: artArr.join(','),
          keyword: keyword ? keyword.join(',') : "",
          flags: flags ? `|${flags.join("|")}|` : "",
          style: JSON.stringify(style),
        }
      }).then(res => {
        props.render()
        params.cancel()
        params.message()
      })
    }

    return {
      isShow,
      drawer,
      channel,
      menu,
      navType,
      detail,
      submit,
      cateList,
      tagList,
      articleList,
      getCate,
      getTag,
      getArticle,
    }
  }
})
</script>

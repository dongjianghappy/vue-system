<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增单页"}}
</v-button>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑单页' : '新增单页' " :data="data" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <v-tabs :tabs="tabsNav" method="click">
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">名称</span>
            <div style="display: flex">
              <div style="flex: 1">
                <input v-model="detail.title" type="text" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <v-titleattribute :style="detail.style || {}" :setStyle="(param) => detail.style = param" />
            </div>
          </li>
          <li class="li">
            <span class="label">页面标签</span>
            <v-tag v-model:tags="detail.keyword" />
          </li>
          <li class="li" style="overflow: auto;">
            <span class="label">图片</span>
            <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding.art}" :dataList="detail.img || []" uploadtype="picture" @imgList="image" :style="'width: 135px'" />
          </li>
          <li class="li">
            <span class="label">内容</span>
            <v-editor v-model:contentsss="detail.markdown" />
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
            <span class="label">页面标题</span>
            <input id="title" v-model="detail.seotitle" type="text" placeholder="请输入页面标题" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">页面描述</span>
            <textarea placeholder="请输入页面描述" v-model="detail.description" class="w-full"></textarea>
          </li>
          <li class="li">
            <span class="label">模板</span>
            <v-select :enums="templates" v-model:value="detail.single_templates" :defaultValue="detail.single_templates = detail.single_templates ? detail.single_templates : 'singlepage.htm'" />
          </li>
          <li class="li">
            <span class="label">目录</span>
            <input id="title" v-model="detail.dir_file" type="text" placeholder="请输入目录" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">文件名</span>
            <input id="title" v-model="detail.html" type="text" placeholder="请输入文件名" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">是否跳转</span>
            <v-radio label="是" name="target" value="1" v-model:checked="detail.target" />
            <v-radio label="否" name="target" value="0" v-model:checked="detail.target" />
          </li>
        </ul>
      </template>
    </v-tabs>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
  computed
} from '@/utils'
import {
  tabsNav
} from '@/assets/const'
import {
  NAV_TYPE,
} from '@/assets/enum'
  const props: any =defineProps({
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
    auth: {
      type: Boolean,
      default: false
    },
  })
    const store = useStore();
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const cateList: any = ref([])
    const tagList: any = ref([])
    const articleList: any = ref([])
    const detail: any = ref({})
    const img: any = ref("")
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

    // 监听图片上传
    function image(a: any) {
      img.value = a
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
</script>

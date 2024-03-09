<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '添加网站'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑网站' : '添加网站' " api="articleDetail" :data="{coding: data.art, id: data.id}" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
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
        <v-select :enums="provinceType" v-model:value="detail.province" :defaultValue="detail.source = detail.source ? detail.source : '5'" />
      </li>
      <li class="li">
        <span class="label">网站类型</span>
        {{detail.parent}}
        <v-category name="选择分类" :data="{item: detail, coding: data.cate}" :isMore="true" type="text"></v-category>
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="checked" value="1" v-model:checked="detail.checked" />
        <v-radio label="否" name="checked" value="0" v-model:checked="detail.checked" />
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
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'
import {
  PRIOVINCE
} from '@/assets/const'
export default defineComponent({
  name: 'v-Search',
  components: {
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
    const store = useStore()
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const provinceType: any = PRIOVINCE
    const checkedList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        debugger
        checkedList.value = detail.value.website ? detail.value.website.split(",") : []
        debugger
      }
    })

    function submit(cancel: any) {
      debugger
      store.dispatch('common/Fetch', {
        api: props.action === "edit" ? 'updateArticle' : "insertArticle",
        data: {
          coding: props.data.art,
          ...detail.value,
          website: checkedList.value.join(',')
        }
      }).then(() => {
        debugger
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      drawer,
      provinceType,
      submit,
      checkedList
    }
  }
})
</script>

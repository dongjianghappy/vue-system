<template>
<span @click="handleclick">{{action === 'edit'? "编辑": "新增页面"}}</span>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑页面' : '新增页面' " :data="data" api="routerDetail" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li clearfix">
        <span class="label">页面名称</span>
        <div class="col-md-6 mr10"><input v-model="detail.name" type="text" placeholder="请输入页面名称" class="input-sm input-full" /></div>
        <div class="col-md-5">侧栏标识<input v-model="detail.module" type="text" placeholder="请输入侧边栏标识如: basic" class="input-sm input-150 ml10" /></div>

      </li>
      <li class="li">
        <span class="label">路径</span>
        <input v-model="detail.path" type="text" placeholder="请输入path路径" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
        <span class="pl15" @click="handelUpdate">更新子页面排序</span>
      </li>
      <li class="li">
        <span class="label">所属页面</span>
        {{detail.parent}}{{detail.fid}}
        <v-category name="选择页面" :data="{item: detail, coding: 'P0015'}" :isInt="true" type="text" api="routerSelect"></v-category>

      </li>
      <li class="li">
        <span class="label">组件</span>
        <input v-model="detail.component" type="text" placeholder="请输入组件" class="input-sm input-150 mr10" />
        <Popover content="选择组件" arrow="tb" offset="right" :move="-20" :keys="`static_${index}`">
          <div style="display: flex; flex-wrap: wrap; padding: 16px;">
            <span style="width: 20%; padding: 10px 0px;">分类</span>
            <span style="width: 20%; padding: 10px 0px;">文档列表</span>
            <span style="width: 20%; padding: 10px 0px;">图片列表</span>
            <span style="width: 20%; padding: 10px 0px;">音乐列表</span>
            <span style="width: 20%; padding: 10px 0px;">视频列表</span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-comment" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-star" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-download" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-recycle" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-slideshow" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-app" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-gather" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-mysql" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-moxing" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-route" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-dot" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-email" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-order" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-user" style="color: rgb(153, 153, 153);"></i></span>
          </div>
        </Popover>
      </li>
      <li class="li">
        <span class="label">权限</span>
        <input v-model="detail.authority" type="text" placeholder="请输入以m:name格式的权限标记" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">面包屑节点</span>
        <input v-model="detail.node" type="text" placeholder="" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">面包屑</span>
        <v-radio label="展示" name="breadcrumb" value="true" v-model:checked="detail.breadcrumb" />
        <v-radio label="不展示" name="breadcrumb" value="false" v-model:checked="detail.breadcrumb" />
      </li>
      <li class="li">
        <span class="label">侧边栏</span>
        <v-radio label="展示" name="sidebar" value="true" v-model:checked="detail.sidebar" />
        <v-radio label="不展示" name="sidebar" value="false" v-model:checked="detail.sidebar" />
      </li>
      <li class="li">
        <span class="label">是否点击</span>
        <v-radio label="可点" name="disabled" value="true" v-model:checked="detail.disabled" />
        <v-radio label="不可点" name="disabled" value="false" v-model:checked="detail.disabled" />
      </li>
      <li class="li">
        <span class="label">图标</span>
        图标<input v-model="detail.icon" type="text" placeholder="请输入标题" class="input-sm input-150 mlr15" />
        <Popover content="选择图标" arrow="tb" offset="right" :move="-20" :keys="`static_${index}`">
          <div style="display: flex; flex-wrap: wrap; padding: 16px;">
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-home" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-shezhi" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-list" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-article" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-like" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-comment" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-star" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-download" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-recycle" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-slideshow" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-app" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-gather" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-mysql" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-moxing" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-route" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-dot" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-email" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-order" style="color: rgb(153, 153, 153);"></i></span>
            <span style="width: 20%; padding: 10px 0px;"><i class="iconfont icon-user" style="color: rgb(153, 153, 153);"></i></span>
          </div>
        </Popover>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
import Popover from '@/components/packages/popover/index.vue';
export default defineComponent({
  name: 'v-Search',
  components: {
    Popover
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
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    datas: {
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
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const store = useStore();

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        if (props.action === "add") {
          const {
            module,
            id,
            path,
            authority,
            name

          }: any = props.datas
          const aaa = {
            module,
            fid: id,
            path,
            sort: props.datas.list.length + 1,
            authority,
            parent: name
          }
          detail.value = {
            ...aaa
          }
        } else {
          detail.value = await drawer.value.init()
        }

      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function submit(cancel: any) {
      props
      debugger
      const {
        id,
        fid,
        name,
        path,
        sort,
        component,
        authority,
        module,
        node,
        breadcrumb,
        sidebar,
        disabled,
        icon
      } = detail.value
      const param = {
        id,
        fid,
        name,
        path,
        sort,
        component,
        authority,
        module,
        node,
        breadcrumb,
        sidebar,
        disabled,
        icon
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: 'P0015',
          ...param
        }
      }).then(res => {
        props.render()
        cancel()
      })
    }

    function handelUpdate(){
      store.dispatch('common/Fetch', {
        api: "updateSort",
        data: {
          coding: 'P0015',
          id: props.data.id
        }
      })
    }

    return {
      isShow,
      handleclick,
      detail,
      drawer,
      submit,
      handelUpdate
    }
  }
})
</script>

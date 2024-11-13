<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'write'}`" />
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" title="模块设置" :style="{width: 550}" :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li clearfix">
        <span class="label">模块名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入模块名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">字段</span>
        <input v-model="detail.value" type="text" placeholder="请输入字段" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">图标</span>
        <input v-model="detail.icon" type="text" placeholder="请输入icon图标" class="input-sm input-150" />
        <input v-model="detail.color" type="text" placeholder="请输入颜色值" class="input-sm input-150" />
          
          <v-colorpicker @color="chooseColor" :color="detail.color" attr="fill" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-radiobutton name="type" v-model:checked="detail.type" :enums="[{label: '模块', value: '0'}, {label: '单页', value: '1'}]" />
      </li>
      <li class="li">
        <span class="label">是否显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li clearfix">
        <span class="label">页面标题</span>
        <textarea placeholder="请输入模块页面描述" v-model="detail.description" class="w-full mb10"></textarea>
      </li>
      <li class="li">
        <span class="label">关键字</span>
        <v-tag v-model:tags="detail.keyword" />
      </li>
      <li class="li clearfix">
        <span class="label">描述</span>
        <textarea placeholder="请输入模块页面描述" v-model="detail.description" class="w-full mb10"></textarea>
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
  watch,
  useStore
} from '@/utils'
import {
  SERVER_NAME
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    action: {
      type: String,
      default: "add"
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
    const serverName: any = SERVER_NAME
    const store = useStore();

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function chooseColor(param: any) {
      detail.value.color = param.value
    }

    function submit(params: any) {
      const {
        name,
        icon,
        sort,
        value,
        color,
        status,
        type,
        seotitle,
        behind_title,
        keyword,
        description,
        behind_description
      } = detail.value

      store.dispatch('common/Fetch', {
        api: "update",
        data: {
          coding: props.data.coding,
          id: props.data.id,
          name,
          icon,
          sort,
          value,
          color,
          status,
          type,
          seotitle,
          keyword: keyword ? keyword.join(',') : "",
          description,
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: "编辑成功"
        })
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      submit,
      drawer,
      serverName,
      chooseColor
    }
  }
})
</script>

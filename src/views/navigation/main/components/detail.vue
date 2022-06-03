<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? "编辑": "新增导航"}}
</v-button>
<Drawer ref="drawer" v-if="!disabled" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑导航' : '新增导航' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="alert-description ptb10 plr15">fgfg</div>
    <v-tabs :tabs="menu" method="click">
      <template v-slot:content1>
        <ul class="form-wrap-box">
          <li class="li">
            <span class="label">导航名称</span>
            <div style="display: flex">
              <div style="flex: 1">
                <input v-model="detail.name" type="text" class="input-sm input-full" :style="[detail.style]" />
              </div>
              <v-titleattribute :style="detail.style || {}" :setStyle="setStyle" />
            </div>
          </li>
          <li class="li">
            <span class="label">导航连接</span>
            <input v-model="detail.url" type="text" class="input-sm input-full" />
          </li>
          <li class="li">
            <span class="label">所属导航</span>
            {{detail.parent}}
            <v-category name="选择分类" :data="{detail, coding}" type="text" api="delete"></v-category>

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
            <span class="label">聚合标签</span>
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
            <textarea v-model="detail.description"></textarea>
          </li>
        </ul>
      </template>
    </v-tabs>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useRoute,
  onMounted,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  NAV_TYPE,
} from '@/assets/enum'
import {
  Drawer
} from '@/components/packages/index'
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer
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
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    const navType: any = NAV_TYPE

    let menu: any = ref([{
        name: "导航信息",
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
        if(props.action === 'edit'){
          let style = JSON.parse(detail.value.style)
          detail.value.style = style instanceof Object ? style : {}
        }else{
          detail.value.style = {}
        }
      }
    })

    // 设置属性
    function setStyle(param: any) {
      detail.value.style = param
    }

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    // 保存
    function submit() {

      const {
        style,
        flags,
        keyword
      } = detail.value

      const param: any = {

      }

      store.dispatch('common/Fetch', {
        api: props.action === 'edit' ? 'update' : "insert",
        data: {
          ...props.data,
          ...detail.value,
          keyword: keyword.join(','),
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

    return {
      isShow,
      handleclick,
      detail,
      drawer,
      menu,
      navType,
      setStyle,
      submit
    }
  }
})
</script>

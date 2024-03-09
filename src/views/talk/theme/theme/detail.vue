<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "新增主题"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑主题' : '新增主题' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入主题名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">权限</span>
        <v-radiobutton name="grade" v-model:checked="detail.grade" :enums="[{label: '普通用户', value: '0'},{label: '普通会员', value: '1'}, {label: '高级会员', value: '2'}, {label: 'VIP会员', value: '3'}, {label: '超级VIP', value: '4'}]" />
      </li>
      <li class="li">
        <span class="label">分类</span>
        <span class="mr15">{{detail.parent}}</span>
        <v-choose title="选择分类" :data="{ item: detail, field: 'fid', condition: {type: 'theme'}, coding: 'U0700037' }" v-model:checked="detail.fid" @choose="choose" type="radio" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">固定</span>
        <v-radiobutton name="isfixed" v-model:checked="detail.isfixed" :enums="[{label: '是', value: '1'}, {label: '否', value: '0'}]" />
      </li>
      <li class="li">
        <span class="label">颜色</span>
        <div class="p15 mb5" style="background: #f8f8fa;">
          <div style="overflow: hidden;">
            <div class="col-md-6 mb10 flex">
              <div class="w100">背景色: </div>
              <div style="flex: 1"><input v-model="detail.background_color" type="text" placeholder="请输入背景颜色" class="input-sm input-150" />
              </div>
            </div>
            <div class="col-md-6 mb10 flex">
              <div class="w100">模块背景: </div>
              <div style="flex: 1">
                <input v-model="detail.module_background" type="text" placeholder="请输入模块背景" class="input-sm" />
              </div>
            </div>
            <div class="col-md-6 flex">
              <div class="w100">主色: </div>
              <div style="flex: 1">
                <input v-model="detail.primary_color" type="text" placeholder="请输入主题颜色" class="input-sm" /></div>
            </div>
            <div class="col-md-6 flex">
              <div class="w100">字体色: </div>
              <div style="flex: 1">
                <input v-model="detail.font_color" type="text" placeholder="请输入字体颜色" class="input-sm" />
              </div>
            </div>
            <div class="col-md-6 flex">
              <div class="w100">表单色: </div>
              <div style="flex: 1">
                <input v-model="detail.input_color" type="text" placeholder="请输入字体颜色" class="input-sm" />
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img" uploadtype="theme" @imgList="image" :style="'width: 135px'" />
        </div>
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea v-model="detail.description" placeholder="请输入主题描述" class="w-full"></textarea>
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
  name: 'v-Detail',
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
    }
  },
  setup(props, context) {
    const store: any = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    const img = ref("")

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
        id,
        fid,
        name,
        background_color,
        module_background,
        primary_color,
        font_color,
        input_color,
        isfixed,
        grade,
        description,
        status
      } = detail.value

      const param: any = {
        name,
        fid,
        background_color,
        module_background,
        primary_color,
        font_color,
        input_color,
        isfixed,
        grade,
        img: img.value,
        description,
        status,
        coding: props.data.coding
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          ...param,
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function choose(param: any){
      const {field, data} = param
      detail.value.fid = data.id
      detail.value.parent = data.name
    }

    return {
      isShow,
      drawer,
      upload,
      detail,
      image,
      chooseColor,
      submit,
      choose
    }
  }
})
</script>

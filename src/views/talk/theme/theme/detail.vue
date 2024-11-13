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
          <span class="label">背景图{{detail.intelligent}}</span>
          <div class="flex">
            <div class="mt10" style="background: #33343f;">
              <div class="mr25" style="width: 245px">
                <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img" uploadtype="theme" @imgList="image" maxLength="1" :style="'width: 200px; height: 150px'" />
              </div>
              <div class="p10" style="flex: 1">
                <span class="block m5 relative left" :class="{current: item == transparentIndex }" style="width: 40px; height: 43px" :style="`background: url(${thumbnail}) no-repeat; background-size: cover; filter: brightness(${1-item})`" v-for="(item, index) in transparent" :key="index" @click="handleTransparent(item)">
                </span>
              </div>
            </div>
          </div>
          <div class="font12">点击以下色卡可自定义背景色</div>
          <div class="flex">
            <div class="mr10" style="width: 32px;">
              <input v-model="detail.background_color" type="color" class="p0" style="width: 35px; height: 32px;" />
            </div>
            <div style="flex: 1"><input v-model="detail.background_color" type="text" placeholder="请输入主题背景色" class="input-sm input-150" /></div>
            <div class="mr10" style="width: 70px;">背景图固定</div>
            <div style="width: 120px;">
              <v-radio label="是" name="isfixed" value="1" v-model:checked="detail.isfixed" />
              <v-radio label="否" name="isfixed" value="0" v-model:checked="detail.isfixed" />
            </div>
          </div>
        </li>
      <li class="li">
        <span class="label">模块背景</span>
        <div style="overflow: auto; margin-left: -5px;">
          <span class="block m5 left" style="width: 28px; height: 20px" :style="`background: ${item}`" v-for="(item, index) in color" :key="index" @click="()=>detail.module_background=item"></span>
        </div>
        <div class="font12">点击以下色卡可自定义主色调</div>
        <div class="flex">
          <div class="mr10" style="width: 32px;">
            <input v-model="detail.module_background" type="color" class="p0" style="width: 35px; height: 32px;" />
          </div>
          <div style="flex: 1"> <input v-model="detail.module_background" type="text" placeholder="请输入主题主色调" class="input-sm input-150" /></div>
          <div class="mr10" style="width: 60px;">智能主题</div>
          <div style="width: 120px;">
            <v-radio label="是" name="intelligent" value="1" v-model:checked="detail.intelligent" />
            <v-radio label="否" name="intelligent" value="0" v-model:checked="detail.intelligent" />
          </div>
        </div>
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">其他色调</span>
        <div class="col-md-6">
          <div class="font12">主色</div>
          <div class="flex">
            <div class="mr10" style="width: 32px;">
              <input v-model="detail.primary_color" type="color" class="p0" :disabled="detail.intelligent == '1'" style="width: 35px; height: 32px;" />
            </div>
            <input v-model="detail.primary_color" type="text" placeholder="请输入主题主色调" :disabled="detail.intelligent == '1'" class="input-sm input-150" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="font12">字体色</div>
          <div class="flex">
            <div class="mr10" style="width: 32px;">
              <input v-model="detail.font_color" type="color" class="p0" style="width: 35px; height: 32px;" />
            </div>
            <input v-model="detail.font_color" type="text" placeholder="请输入主题主色调" class="input-sm input-150" />
          </div>
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
import {
  color
} from '@/assets/const'
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
    const img: any = ref("")
    const thumbnail: any = ref("")
    const transparentIndex: any = ref(1)
    const transparent = ref([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        transparentIndex.value = detail.value.background_transparent
        if (detail.value.image) {
          thumbnail.value = detail.value.img
        }
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
      thumbnail.value = (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1/uploadfile/temporary/theme/' : 'http://www.dongblog.com/uploadfile/temporary/theme/') + a.slice(1, -1)
    }

    function choose(param: any) {
      const {
        field,
        data
      } = param
      detail.value.fid = data.id
      detail.value.parent = data.name
    }

    function handleTransparent(param: any) {
      transparentIndex.value = param
      detail.value.background_transparent = param
    }

    return {
      isShow,
      drawer,
      color,
      thumbnail,
      transparent,
      transparentIndex,
      handleTransparent,
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

<style lang="less" scoped>
.current{
  border: 3px solid #fff;
}
</style>
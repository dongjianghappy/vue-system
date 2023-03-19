<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "新增主题"}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑主题' : '新增主题' " :data="data" :style="{width: '600', height: '480'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入主题名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">背景颜色</span>
        <div style="display: flex">
          <div class="w150"><input v-model="detail.color" type="text" placeholder="请输入背景颜色" class="input-sm input-full" /></div>
          <v-colorpicker :color="detail.color" @color="chooseColor" />
        </div>
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <div style="overflow: hidden;">
          <v-uploads ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img" uploadtype="theme" @imgList="image" :style="'width: 135px'" />
        </div>
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea v-model="detail.description" placeholder="请输入主题描述" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-dialog>
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
    const dialog: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    const img = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function chooseColor(param: any) {
      detail.value.color = param.value
    }

    function submit(params: any) {

      const {
        id,
        name,
        color,
        description
      } = detail.value

      const param: any = {
        name,
        color,
        img: img.value,
        description,
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
      debugger
      img.value = a
    }

    return {
      isShow,
      dialog,
      upload,
      detail,
      image,
      chooseColor,
      submit
    }
  }
})
</script>

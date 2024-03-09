<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "添加信纸"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑信纸' : '添加信纸' " :style="{width: '450'}" :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">模板名称</span>
        <div style="display: flex">
          <div style="flex: 1">
            <input v-model="detail.name" type="text" placeholder="请输入模板名称" class="input-sm input-full" :style="[detail.style]" />
          </div>
        </div>
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">颜色</span>
        <input v-model="detail.color" type="text" placeholder="请输入信纸颜色" class="input-sm input-full" :style="[detail.style]" />
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">背景图</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding:coding}" :dataList="detail.img || []" uploadtype="template" @imgList="image" :style="'width: 135px'" />
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea placeholder="请输入描述" v-model="detail.description" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
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
    }
  },
  setup(props, context) {
    const store = useStore();
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

    // 监听图片上传
    function image(a: any) {
      debugger
      img.value = a
    }

    function submit(params: any) {
      const {
        id,
        name,
        color,
        description,
        status
      } = detail.value
      const param: any = {
        name,
        img: img.value,
        color,
        description,
        status

      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          ...param,
        }
      }).then(() => {
        debugger
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      upload,
      detail,
      drawer,
      image,
      submit
    }
  }
})
</script>

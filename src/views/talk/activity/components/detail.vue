<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "创建话题"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑话题' : '创建话题' " :data="data" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">话题名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入话题名称" class="input-sm input-full" sty />
      </li>
      <li class="li">
        <span class="label">话题类型</span>
        <v-select :enums="[{value: '1', name: '学生'}, {value: '2', name: '体育'}]" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '2'" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li" style="overflow: auto">
        <span class="label">预览图</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img || []" uploadtype="weibo" @imgList="image" :style="'width: 135px'" />
      </li>
      <li class="li">
        <span class="label">话题描述</span>
        <textarea placeholder="请输入话题描述" v-model="detail.summary" class="w-full"></textarea>
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
  useStore,
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
    const store = useStore()
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
      img.value = a
    }

    function submit(cancel: any) {
      const {
        id,
        name,
        type,
        summary
      } = detail.value

      const param: any = {
        singer_id: props.data.singer_id,
        name,
        type,
        summary,
        img: img.value
      }
      debugger
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }

    return {
      isShow,
      detail,
      drawer,
      upload,
      submit,
      image
    }
  }
})
</script>

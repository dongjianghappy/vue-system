<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑内容' : '新增内容' " :style="{width: 450}" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <div class="pt50 hide" style="text-align: center;">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="file" v-model:file="fileInfo" uploadtype="file" format=".js" />
    </div>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea placeholder="请输入单页摘要" v-model="detail.content" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  codings,
  defineComponent,
  ref,
  useStore,
  watch,
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  components: {},
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
    isRoot: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const coding: any = codings.track
    const upload: any = ref(null);
    const fileInfo: any = ref({})
    const detail: any = ref({})
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value && props.action === 'edit') {
        init()
      }
    })

    function init(){
      store.dispatch('common/Fetch', {
        api: 'detail',
        data: {
          coding: coding.list,
          id: props.data.id
        }
      }).then(async res => {
        detail.value = res.result
      })
    }

    function submit(params: any) {
      const {
        id,
        name,
        status,
        content
      } = detail.value
      const param: any = {
        name,
        status,
        content
      }
      if (props.action === 'edit') {
        param.id = id
      }else{
        debugger
        if (props.isRoot) {
          param.artid = props.data.artid
        } else {
          param.fid = props.data.id
        }
      }
      

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: coding.list,
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
      submit,
      upload,
      fileInfo
    }
  }
})
</script>

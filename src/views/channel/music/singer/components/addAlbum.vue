<template>
<v-button v-model:show="isShow" :disabled="true">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "新增专辑"}}
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" :action="action" title="新增专辑" :style="{width: '500', height: '480'}" :data="{...data}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">专辑</span>
        <input type="text" v-model="detail.name" placeholder="请输入专辑名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input type="text" v-model="detail.sort" placeholder="请输入顺序" class="input-sm input-full" />
      </li>
      <li class="li" style="overflow: auto">
        <span class="label">专辑</span>
        <v-upload ref="upload" :data="{id: detail.id, cover: detail.cover,  coding: data.coding}" :dataList="detail.img || []" uploadtype="music" @imgList="image" :style="'width: 135px'" />
      </li>
      <li class="li">
        <span class="label">专辑描述</span>
        <textarea placeholder="请输入单页摘要" v-model="detail.description" class="w-full"></textarea>
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
  name: 'v-Search',
  components: {

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
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore()
    const isShow: any = ref(false)
    const dialog: any = ref(null)
    const detail: any = ref({
      name: "",
      sort: "",
      description: ''
    })
    const upload: any = ref(null);
    const img = ref("")

   // 监听
    watch([isShow], async (newValues, prevValues) => {
      debugger
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function submit(cancel: any) {
      const {
        id,
        name,
        sort,
        description
      } = detail.value

      const param: any = {
        singer_id: props.data.singer_id,
        name,
        sort,
        description,
        img: img.value
      }

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

    // 监听图片上传
    function image(a: any) {
      debugger
      img.value = a
    }

    return {
      isShow,
      detail,
      dialog,
      submit,
      upload,
      image
    }
  }
})
</script>

<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增选项"}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑选项' : '新增选项'" :data="data" :style="{width: '520', height: '520'}" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">勋章名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入策略名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">条件</span>
        <input v-model="detail.award_condition" type="text" placeholder="请输入周期" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">勋章说明</span>
        <textarea v-model="detail.description" placeholder="请输入金币说明" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">图标</span>
        <div style="overflow: hidden;">
          <v-upload ref="upload" :data="{id: detail.id, coding: data.coding}" :dataList="detail.img" uploadtype="medal" @imgList="image" maxLength="1" :style="'width: 135px'" />
        </div>
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
    const detail: any = ref({})
    const img: any = ref("")

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function submit(params: any) {

      const {
        id,
        name,
        award_condition,
        description
      } = detail.value

      const param: any = {
        name,
        img: img.value,
        award_condition,
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

    return {
      isShow,
      dialog,
      detail,
      img,
      image,
      submit
    }
  }
})
</script>

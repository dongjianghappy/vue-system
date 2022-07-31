<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? '编辑': '添加内容'}}
</v-button>
<Dialog ref="dialog" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑内容' : '添加内容' " api="favoriteDetali" :data="{id: data.id, coding: data.coding.art}" width="520px" height="350px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.name" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">链接</span>
        <input type="text" v-model="detail.url" placeholder="请输入链接地址" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">状态</span>
        <v-radio label="显示" name="checked" value="1" v-model:checked="detail.checked" />
        <v-radio label="关闭" name="checked" value="0" v-model:checked="detail.checked" />
      </li>
      <li class="li">
        <span class="label">收藏夹</span>
        <v-select :enums="favorites" v-model:value="detail.fid" :defaultValue="detail.fid = detail.fid ? detail.fid : '5'" />

      </li>
    </ul>
  </template>
</Dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  Dialog
} from '@/components/packages/index'
import {
  TEXT_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    Dialog
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
    favorites: {
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
  },
  setup(props, context) {
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const dialog: any = ref(null)
    const textType = TEXT_TYPE
    

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })



    function submit(cancel: any) {
      const {
        id,
        fid,
        name,
        url,
        checked
      } = detail.value
      const param: any = {
        fid,
        name,
        url,
        checked
      }

      if (props.action === "edit") {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data.coding.art,
          ...param
        }
      }).then(res => {
        isShow.value = false
        props.render()
      })
    }

    return {
      textType,
      isShow,
      detail,
      dialog,
      submit,
    }
  }
})
</script>

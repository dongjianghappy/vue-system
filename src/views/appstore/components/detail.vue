<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增应用'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑应用' : '新增应用' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">新增类型</span>
        <v-select :enums="appCenter" :value="detail.type" @onChange="getGrade" :defaultValue="detail.type = detail.type ? detail.type : '1'" />

      </li>
      <li class="li">
        <span class="label">应用名称</span>
        <v-select :enums="gradeList" v-model:value="detail.module" @onChange="sssss" />
      </li>
      <li class="li">
        <span class="label">模块</span>
        <input v-model="detail.module" type="text" placeholder="请输入模块" disabled class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">状态</span>
        <v-radio label="开启" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="关闭" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li" style="overflow: auto;">
        <span class="label">预览图</span>
        <SpaceModal v-model:image="detail.image">
          <span class="right">选择图片</span>
        </SpaceModal>
        <img width="398" height="150" :src="detail.image" alt="">
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea placeholder="请输入描述" v-model="detail.description" disabled class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import SpaceModal from '../../space/components/modalSpace.vue'
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'
import {
  APP_CENTER,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    SpaceModal
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
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const appCenter: any = APP_CENTER
    const gradeList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        getGrade(detail.value.type)
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    // 上传图片
    function uploadImg() {
      upload.value.handleclick()
    }

    function getGrade(param: any) {
      detail.value.type = param
      //
      store.dispatch('setting/Fetch', {
        api: "userGrade",
        data: {
          type: detail.value.type
        }
      }).then(res => {
        gradeList.value = res.result
      })
    }

    // 选择权限
    function sssss(param: any) {
      let arr = gradeList.value.filter((item: any) => item.value === param)
      detail.value.grade_id = arr[0].id
      detail.value.name = arr[0].name
      detail.value.module = arr[0].value
      detail.value.description = arr[0].description
    }

    function submit(params: any) {
      debugger
      const {
        id,
        grade_id,
        type,
        name,
        image,
        module,
        sort,
        status,
        description
      } = detail.value
      
      const param: any = {
        grade_id,
        type,
        name,
        image,
        module,
        sort,
        status,
        description
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
        props.render()
        params.message()
        params.cancel()
      })
    }

    return {
      appCenter,
      isShow,
      handleclick,
      detail,
      drawer,
      upload,
      uploadImg,
      getGrade,
      gradeList,
      sssss,
      submit
    }
  }
})
</script>

<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增应用'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑应用' : '新增应用' " :data="data" :param="detail" :render="render">
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
      <li class="li">
        <span class="label">预览图</span>
        <v-spacemodal>
          <div class="space-wrap" style="display: flex;">
            <div class="space-picture p10" style="background: rgb(250, 250, 250); flex: 2 1 0%; height: auto;">
              <div class="pointer"><img width="250" height="100" alt=""></div>
            </div>
            <div style="flex: 1 1 0%;">
              <div style="flex: 1 1 0%; display: flex; justify-content: center;">
                <div>
                  <div style="background: rgb(250, 250, 250); border: 2px dashed rgb(238, 238, 238); height: 150px; width: 150px; line-height: 150px; text-align: center;"><i class="iconfont icon-add font30"></i></div>
                </div>
              </div>
            </div>
          </div>
        </v-spacemodal>
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
  components: {},
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
      detail.value.name = arr[0].name
      detail.value.module = arr[0].value
      detail.value.description = arr[0].description
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
      sssss
    }
  }
})
</script>

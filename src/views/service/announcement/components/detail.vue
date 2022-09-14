<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? "编辑": "发布公告通知"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑公告通知' : '发布公告通知' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">伙伴名称</span>
        <input v-model="detail.title" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">类型</span>
        <v-select :enums="sourceType" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '1'" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <SpaceModal>
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
        </SpaceModal>
      </li>
    </ul>
    <div class="edit-article">
      <Editor v-model:contentsss="detail.content" />
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@/utils'
import {
  ANNOUNCEMENT_TYPE,
} from '@/assets/enum'
import Editor from '@/components/packages/editor/index.vue'
import SpaceModal from '../../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    SpaceModal,
    Editor
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
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const sourceType: any = ANNOUNCEMENT_TYPE
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    // 上传图片
    function uploadImg() {
      upload.value.handleclick()
    }

    return {
      isShow,
      sourceType,
      detail,
      drawer,
      uploadImg,
      upload,
    }
  }
})
</script>

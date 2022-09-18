<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-anonymous-iconfont" />新增轮播图
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" action="add" title="新增轮播图" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入轮播图名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">链接</span>
        <input v-model="detail.url" type="text" placeholder="请输入地址" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">状态</span>
        <v-radio label="是" name="checked" value="1" v-model:checked="detail.checked" />
        <v-radio label="否" name="checked" value="0" v-model:checked="detail.checked" />
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
      <li class="li">
        <span class="label">说明</span>
        <textarea placeholder="请输入说明" v-model="detail.description" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRoute,
  watch,
} from '@/utils'
import SpaceModal from '../../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Detail',
  components: {
    SpaceModal
  },
  props: {
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
    const route: any = useRoute()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        detail.value.fid = route.query.fid
      }
    })

    // 上传图片
    function uploadImg() {
      upload.value.handleclick()
    }

    return {
      isShow,
      detail,
      drawer,
      uploadImg,
      upload,
    }
  }
})
</script>

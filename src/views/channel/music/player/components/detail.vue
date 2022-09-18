<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? "编辑": "新增歌谱"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑歌谱' : '新增歌谱' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">歌谱名称</span>
        <input v-model="detail.score_name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">种类</span>
        <v-radiobutton name="ssss" v-model:checked="detail.type" :enums="[{label: '吉他', value: '0'}, {label: '架子鼓', value: '1'}, {label: '钢琴', value: '2'}]" v-model:value="detail.area" />
      </li>
      <li class="li">
        <span class="label">音调</span>
        <v-select :enums="sourceType" v-model:value="detail.tune" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="checked" value="1" v-model:checked="detail.checked" />
        <v-radio label="否" name="checked" value="0" v-model:checked="detail.checked" />
      </li>
      <li class="li">
        <span class="label">谱子</span>
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
        <textarea placeholder="请输入单页摘要" v-model="detail.content" class="w-full"></textarea>
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
} from '@/utils'
import SpaceModal from '../../../../space/components/modalSpace.vue'
import {
  LINK_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    SpaceModal
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
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const sourceType: any = LINK_TYPE
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
      detail,
      drawer,
      uploadImg,
      upload,
      sourceType
    }
  }
})
</script>

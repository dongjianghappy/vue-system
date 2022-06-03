<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? "编辑": "上传视频"}}
</v-button>
<Drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑歌曲' : '上传视频' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li clearfix">
        <span class="label">标题</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">tag标签</span>
        <input v-model="detail.url" type="text" placeholder="请输入地址" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">所属分类</span>
        {{detail.parent}}
        <v-category name="选择分类" :data="{detail, coding}" type="text" api="delete"></v-category>

      </li>
      <li class="li">
        <span class="label">是否显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">上传视频</span>
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
    <div class="summary mt20">
      <h2 class="mb15 font18">摘要</h2>
      <textarea placeholder="请输入单页摘要" v-model="detail.summary" class="w-full"></textarea>
    </div>
    <div class="summary mt20">
      <h2 class="mb15 font18">聚合标签</h2>
      <v-checkboxgroup :tagList="checkboxList" />
    </div>
  </template>
</Drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
} from '@/utils'
import {
  Drawer
} from '@/components/packages/index'
import SpaceModal from '../../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer,
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
    const detail: any = ref({})
    const drawer: any = ref(null)
    const upload: any = ref(null);
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
    }
  }
})
</script>

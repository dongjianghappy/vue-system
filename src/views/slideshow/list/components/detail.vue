<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? "编辑": "新增轮播图"}}
</v-button>
<Drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑轮播图' : '新增轮播图' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">标题</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
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
        <ul>
          <li v-for="(img, index) in data.image" :key="index" style="width:120px; height:120px; display: inline-block;"><img :src="img" style="width:120px; height:120px" @click="handelCopy(img)" /></li>
        </ul>
        <v-upload ref="upload" :uploadtype='mod' :img="data.img" @imgList="image" />
        <div>
          <a data-uploadtype="tech" data-temp="nineimg" class="cl-ccc" @click="uploadImg">点击上传图片</a>
          <span style=" margin-left: 25px; color:#ccc">请上传本地图片，大小不超过2MB</span>
        </div>
      </li>
      <li class="li">
        <span class="label">说明</span>
        <input v-model="detail.description" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
    </ul>
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
export default defineComponent({
  name: 'v-Search',
  components: {
    Drawer
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

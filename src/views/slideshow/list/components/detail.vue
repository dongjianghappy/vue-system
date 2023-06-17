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
      <li class="li" style="overflow: auto;">
        <span class="label">预览图</span>
        <SpaceModal v-model:image="detail.image">
          <span class="right">选择图片</span>
        </SpaceModal>
        <img width="398" height="150" :src="detail.image" alt="">
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
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        detail.value.fid = route.query.fid
      }
    })

    return {
      isShow,
      detail,
      drawer
    }
  }
})
</script>

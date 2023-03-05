<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增推广'}}
</v-button>
<v-drawer ref="drawer" v-if="!disabled" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑推广' : '新增推广' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">推广名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入推广名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">url地址</span>
        <input v-model="detail.url" type="text" placeholder="请输入url地址" class="input-sm input-full" />
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
        <v-select :enums="spreadType" v-model:value="detail.type" :defaultValue="detail.type = detail.type ? detail.type : '0'" />
      </li>
      <li class="li">
        <span class="label">区域</span>
        <v-select :enums="spreadArea" v-model:value="detail.area" :defaultValue="detail.area = detail.area ? detail.area : '0'" />
      </li>
      <li class="li">
        <span class="label">预览图</span>
        <SpaceModal v-model:image="detail.image">
          <span class="right">选择图片</span>
        </SpaceModal>
        <div>
          <img height="150" style="width: 100%" :src="detail.image" alt="">
        </div>
      </li>
      <li class="li">
        <span class="label">站点介绍</span>
        <textarea placeholder="请输入站点介绍" v-model="data.content" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch
} from '@/utils'
import {
  SPREAD_TYPE,
  SPREAD_AREA
} from '@/assets/enum'
import SpaceModal from '../../space/components/modalSpace.vue'
export default defineComponent({
  name: 'v-Detail',
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
    // 是否展示
    disabled: {
      type: Boolean,
      default: false
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
    const spreadType: any = SPREAD_TYPE
    const spreadArea: any = SPREAD_AREA
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      isShow,
      detail,
      drawer,
      spreadType,
      spreadArea
    }
  }
})
</script>

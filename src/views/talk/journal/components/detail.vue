<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "发布公告通知"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑公告通知' : '发布公告通知' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">公共通知</span>
        <input v-model="detail.title" type="text" placeholder="请输入公共通知" class="input-sm input-full" />
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
    </ul>
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.content" />
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
// import Editor from '@/components/packages/editor/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    // Editor
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
    const detail: any = ref({})
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    return {
      isShow,
      sourceType,
      detail,
      drawer
    }
  }
})
</script>

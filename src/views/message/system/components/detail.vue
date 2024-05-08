<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "推送消息"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑消息' : '推送消息' " :data="data" :param="detail" :submitApi="{insert: 'sendSystemMessage', update: 'updateVote'}" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">标题</span>
        <div style="display: flex;">
          <div class="w150 mr10"><input v-model="detail.title" type="text" placeholder="请输入伙伴名称" class="input-sm input-full" sty /></div>
          <div style="flex: 1"><input v-model="detail.url" type="text" placeholder="请输入网址" class="input-sm input-full" /></div>
        </div>
      </li>
      <li class="li">
        <span class="label">类型</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
    </ul>
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.content" :data="detail" />
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  ref,
  watch,
  useStore
} from '@/utils'

export default defineComponent({
  name: 'v-Search',
  components: {
   
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
    const store = useStore();
    const isShow: any = ref(false)
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
      detail,
      drawer
    }
  }
})
</script>

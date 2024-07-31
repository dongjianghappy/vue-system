<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增功能特权"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑功能特权' : '新增功能特权' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
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
        <span class="label">图标</span>
        <input v-model="detail.icon" type="text" placeholder="请输入图标" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">应用功能</span>
        <span class="mr15">{{detail.appName}}</span>
        <v-choose :data="{item: detail, coding: data.coding, condition: {status: 1}}" v-model:checked="detail.grade" type="radio" api="getAppstore" @choose="choose" />
      </li>
    </ul>
    <div class="edit-article">
      <v-editor v-model:contentsss="detail.markdown" :data="detail" />
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

    function choose(param: any) {
      const {
        data
      } = param
      debugger
      detail.value.app = data.id
      detail.value.appName = data.name
      detail.value.type = data.type
    }      

    return {
      isShow,
      detail,
      drawer,
      choose
    }
  }
})
</script>

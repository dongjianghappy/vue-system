<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增模型"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑模型' : '新增模型' " :data="{...data, coding: data.coding.model}" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">模型名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入模型名称" class="input-sm input-full" />
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
        <span class="label">所属类型</span>
        {{detail.parent}}
        <v-category name="选择分类" :data="{item: detail, coding: data.coding.cate}" api="simpleCategory" :isInt="true" :isMore="true" type="text"></v-category>
      </li>
      <li class="li">
        <span class="label">颜色</span>
        <input v-model="detail.color" type="text" placeholder="请输入颜色" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">速度</span>
        <input v-model="detail.speed" type="text" placeholder="请输入速度" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">模型描述</span>
        <textarea placeholder="请输入模型描述" v-model="detail.description" class="w-full" ></textarea>
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
  useStore
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
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

<template>
<span @click="handleclick">{{action === 'edit'? "编辑": "新增友情"}}</span>
<Drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑友情链接' : '新增友情链接' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">网站名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">url地址</span>
        <input v-model="detail.url" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <input type="radio" name="method_2" value="1" v-model="detail.status" />
        <input type="radio" name="method_2" value="0" v-model="detail.status" />
      </li>
      <li class="li">
        <span class="label">页面显示</span>
        <input type="radio" name="display" value="1" v-model="detail.display" />
        <input type="radio" name="display" value="0" v-model="detail.display" />
      </li>
      <li class="li">
        <span class="label">来源</span>
        <input v-model="detail.source" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">方式</span>
        <input type="radio" name="method" value="1" v-model="detail.method" />
        <input type="radio" name="method" value="0" v-model="detail.method" />
      </li>
      <li class="li">
        <span class="label">出售状态</span>
        <input type="radio" name="sell" value="1" v-model="detail.sell" />
        <input type="radio" name="sell" value="0" v-model="detail.sell" />
      </li>
      <li class="li">
        <span class="label">出售次数</span>
        <input v-model="detail.webmaster" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">价格</span>
        <input v-model="detail.price" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">站点介绍</span>
        <input v-model="detail.content" type="text" placeholder="请输入标题" class="input-sm input-full" />
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
    }
  },
  setup(props, context) {
    const isShow: any = ref(false)
    const detail: any = ref({})
    const drawer: any = ref(null)
    
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      handleclick,
      detail,
      drawer
    }
  }
})
</script>

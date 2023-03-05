<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? '编辑': '新增广告位'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑广告位' : '新增广告位' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">广告位名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入广告名称" class="input-sm input-full" />
      </li>
       <li class="li">
        <span class="label">网站</span>
        <template v-for="(item, index) in serverName" :key="index">
          <span v-if="detail.website === item.value" class="mr15">{{item.name}}</span>
        </template>
        <ChooseSite :data="data" :render="init" v-model:checked="detail.website" type="radio" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">引用标签</span>
        <input v-model="detail.label" type="text" placeholder="请输入dom元素id" class="input-sm input-150" /> (页面dom元素id)
      </li>
     
      <li class="li">
        <span class="label">启用</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>

      <li class="li">
        <span class="label">描述</span>
        <textarea placeholder="请输入代码" v-model="detail.description" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch
} from '@/utils'
import ChooseSite from '../../../links/components/chooseSite.vue'
import {
  LINK_TYPE,
  SERVER_NAME
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Search',
  components: {
    ChooseSite,
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
    const sourceType: any = LINK_TYPE
    const serverName: any = SERVER_NAME

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
      sourceType,
      serverName
    }
  }
})
</script>

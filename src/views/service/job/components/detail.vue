<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'add'}`" />{{action === 'edit'? '编辑': '新增职位'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑职位' : '新增职位' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">职位名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入职位名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">显示</span>
        <v-radio label="是" name="status" value="1" v-model:checked="detail.status" />
        <v-radio label="否" name="status" value="0" v-model:checked="detail.status" />
      </li>
      <li class="li">
        <span class="label">部门</span>
        <input v-model="detail.department" type="text" placeholder="请输入部门" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">工作岗位</span>
        <input v-model="detail.post" type="text" placeholder="请输入工作岗位" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">工作地址</span>
        <input v-model="detail.address" type="text" placeholder="请输入工作地址" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">招聘人数</span>
        <input v-model="detail.number" type="text" placeholder="请输入招聘人数" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">时间期限</span>
        <input v-model="detail.datetime" type="text" placeholder="请输入时间期限" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">岗位职责</span>
        <textarea placeholder="请输入岗位职责" v-model="detail.responsibilities" class="w-full"></textarea>
      </li>
      <li class="li">
        <span class="label">任职资格</span>
        <textarea placeholder="请输入任职资格" v-model="detail.qualifications" class="w-full"></textarea>
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
  LINK_TYPE,
} from '@/assets/enum'
export default defineComponent({
  name: 'v-Detail',
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
    const drawer: any = ref(null)
    const sourceType: any = LINK_TYPE
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
      sourceType
    }
  }
})
</script>

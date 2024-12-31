<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增歌词"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑歌词' : '新增歌词' " :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">歌词名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
    </ul>
    <div class="summary mt20">
      <div class="mb15 font14">歌词</div>
      <v-editor v-model:contentsss="detail.content" :data="detail" />
    </div>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useProps
} from '@/utils'
const props: any = defineProps(useProps)
  const isShow: any = ref(false)
  const detail: any = ref({})
  const drawer: any = ref(null)
  // 监听
  watch([isShow], async (newValues, prevValues) => {
    if (isShow.value) {
      detail.value = await drawer.value.init()
    }
  })
</script>

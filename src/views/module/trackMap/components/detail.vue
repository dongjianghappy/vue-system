<template>
<v-button v-model:show="isShow" :disabled="auth">
  <template v-if="name">{{name}}</template>
  <template v-else>
    <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "新增轨道图"}}
  </template>
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑内容' : '新增轨道图' " :data="{...data, coding: data.coding.art}" :param="detail" :render="render" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
        <input type="checkbox" v-model="detail.checked" :checked="detail.checked" class="mr5" style="float: left;"><span>显示</span>
      </label>
    </v-space>
  </template>  
  <template v-slot:content v-if="isShow">
    <div class="pt50 hide" style="text-align: center;">
      <v-upload ref="upload" @imgList="image" v-model:haschoose="file" :show="false" file="file" v-model:file="fileInfo" uploadtype="file" format=".js" />
    </div>
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入标题" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">描述</span>
        <textarea placeholder="请输入单页摘要" v-model="detail.description" class="w-full"></textarea>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useProps,
  useStore,
  watch,
} from '@/utils'
  const props: any = defineProps(useProps)
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const upload: any = ref(null);
    const fileInfo: any = ref({})
    const detail: any = ref({})
    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        if (props.action === 'edit') {
          let style = JSON.parse(detail.value.style || '{}')
          detail.value.style = style instanceof Object ? style : {}
        } else {
          detail.value.style = {}
        }
      }
    })

    // 监听
    watch([() => fileInfo.value.fileUrl], async (newValues: any, prevValues) => {
      setTimeout(() => {
        
        detail.value.title = fileInfo.value.name.substring(0, fileInfo.value.name.lastIndexOf("."))
      }, 10)
    })

    function submit(params: any) {
      const {
        id,
        name,
        status,
        description
      } = detail.value
      const param: any = {
        name,
        status,
        description
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding.art || props.data.coding,
          ...param
        }
      }).then(() => {
        props.render()
        params.message()
        params.cancel()
      })
    }
</script>

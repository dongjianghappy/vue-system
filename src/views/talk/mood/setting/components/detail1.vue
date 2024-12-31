<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit cl-white'}`" />{{action === 'edit'? '': '新增心情'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑心情' : '新增心情'" :data="data" :style="{width: '450'}" :submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入心情" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">颜色</span>
        <input v-model="detail.color" type="text" placeholder="请输入颜色" class="input-sm input-150" />
      </li>
      <li class="li">
        <span class="label">图标</span>
        <input v-model="detail.icon" type="text" placeholder="请输入心情图标" class="input-sm input-full" />
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
  useProps
} from '@/utils'

  const props: any = defineProps(useProps)
    const store: any = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
        detail.value.fid = props.data.fid
      }
    })

    function submit(params: any) {
      const {
        id,
        fid,
        name,
        color,
        icon
      } = detail.value

      const param: any = {
        fid,
        name,
        color,
        icon,
        coding: props.data.coding
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          ...param,
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }
</script>

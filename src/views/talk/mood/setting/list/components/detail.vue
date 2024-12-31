<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? '': '新增状态词'}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑状态词' : '新增状态词'" :data="data" :style="{width: '450'}" :submit="submit">
  <template v-slot:content v-if="isShow">
    <textarea placeholder="请输入心情内容" v-model="detail.content" class="w-full"></textarea>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  useStore,
  watch,
} from '@/utils'
  const props: any = defineProps({
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
  })
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
        content
      } = detail.value

      const param: any = {
        fid,
        content
      }
      if (props.action === 'edit') {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== 'add' ? 'update' : 'insert',
        data: {
          coding: props.data.coding,
          ...param,
        }
      }).then(() => {
        props.render()
        isShow.value = false
      })
    }
</script>

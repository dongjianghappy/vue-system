<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'add' ? '创建收藏夹' : ''}}
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :title="action === 'add' ? '创建收藏夹' : '编辑收藏夹'" :action="action" :data="data" :style="{width: '520', height: '200'}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.name" placeholder="请输入名称" class="input-sm input-full" />
      </li>
    </ul>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore
} from '@/utils'

  const props: any =defineProps({
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
    const store = useStore();
    const isShow: any = ref(false)
    const detail: any = ref({})
    const dialog: any = ref(null)

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await dialog.value.init()
      }
    })

    function submit(cancel: any) {
      const {
        id,
        name,
      } = detail.value

      const param: any = {
        name
      }

      if (props.action === "edit") {
        param.id = id
      }

      store.dispatch('common/Fetch', {
        api: props.action !== "add" ? 'update' : "insert",
        data: {
          coding: props.data.coding,
          ...param
        }
      }).then(res => {
        props.render()
        isShow.value = false
      })
    }
</script>

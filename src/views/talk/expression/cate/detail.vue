<template>
<v-button v-model:show="isShow">
  <i class="iconfont" :class="`icon-${action === 'add' ? 'anonymous-iconfont' : 'edit'}`" />{{action === 'edit'? "": "新增分类"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑分类' : '新增分类' " :data="data" :param="detail" :render="render" :submit="submit">
  <template v-slot:extra>
    <v-space>
      <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
        <input type="checkbox" v-model="detail.status" :checked="detail.status" class="mr5" style="float: left;"><span>显示</span>
      </label>
    </v-space>
  </template>   
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input v-model="detail.name" type="text" placeholder="请输入主题名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">顺序</span>
        <input v-model="detail.sort" type="text" placeholder="请输入顺序" class="input-sm input-100" />
      </li>
      <li class="li">
        <span class="label">格式</span>
        <v-select :enums="imgFormat" v-model:value="detail.format" :defaultValue="detail.format = detail.format ? detail.format : 'gif'" />
      </li>
      <li class="li">
        <span class="label">文件夹</span>
        <input v-model="detail.file_dir" type="text" placeholder="请输入文件目录例如：normal" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">图标</span>
        <input v-model="detail.icon" type="text" placeholder="请输入图标" class="input-sm input-100" />
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
} from '@/utils'
import {
  imgFormat
} from '@/assets/const'
  const props: any = defineProps({
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
      }
    })

    function submit(params: any) {
      const {
        id,
        name,
        sort,
        icon,
        format,
        file_dir,
        status
      } = detail.value

      const param: any = {
        name,
        sort,
        icon,
        format,
        file_dir,
        status,
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

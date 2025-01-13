<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont" :class="`icon-${action === 'add' && 'anonymous-iconfont'}`" />{{action === 'edit'? "编辑": "加入收藏"}}
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :action="action" :title="action === 'edit' ? '编辑收藏' : '加入收藏' " :data="data" :param="detail" :render="render">
  <template v-slot:extra>
    <v-space>
      <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
        <input type="checkbox" v-model="detail.checked" :checked="detail.checked" class="mr5" style="float: left;"><span>显示</span>
      </label>
    </v-space>
  </template>    
  <template v-slot:content v-if="isShow">
    <ul class="form-wrap-box">
      <li class="li">
        <span class="label">名称</span>
        <input type="text" v-model="detail.name" placeholder="请输入名称" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">链接</span>
        <input type="text" v-model="detail.url" placeholder="请输入链接地址" class="input-sm input-full" />
      </li>
      <li class="li">
        <span class="label">收藏夹</span>
        <span class="mr15">{{detail.parent}}</span>
        <v-choose :data="{item: detail, coding: data.coding}" v-model:checked="detail.fid" type="radio" @choose="choose" />
        <!-- <v-select :enums="favorites" v-model:value="detail.fid" :defaultValue="detail.fid = detail.fid ? detail.fid : '5'" /> -->
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
} from '@/utils'

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
    },
    auth: {
      type: Boolean,
      default: false
    }
  })
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const detail: any = ref({})

    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        detail.value = await drawer.value.init()
      }
    })

    function choose(param: any) {
      const {
        data
      } = param
      detail.value.fid = data.id
      detail.value.parent = data.name
    } 
</script>

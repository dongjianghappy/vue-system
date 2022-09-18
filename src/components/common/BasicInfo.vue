<template>
<div class="module-wrap m0">
  <div class="module-content basic-info">
    <div class="info-module">
      <span class="name">{{title}}</span>
      <div class="line"></div>
      <span data-coding="" class="update-info editbtn" @click="Edit" v-if="auth.checked('edit')">{{!isEdit ? "保存" : "编辑"}}</span>
    </div>
    <ul class="info">
      <li v-for="(item, index) in data" :key="index" style="padding-left: 100px;">
        <label>{{item.remark}}</label>
        <div class="con" v-if="isEdit">{{item.value}}
          <span class="absolute" style="right: 0" v-if="isDelete">
            <v-confirm name="删除" :data="{id: item.id, ...coding }" type="text" api="delete" :render="render" operating="delete" :auth="true" v-if="auth.checked('del')"></v-confirm>
          </span>
        </div>
        <template v-else>
          <input type="text" v-model="item.value" class="input-sm input-full" v-if="item.text_type === 'single'">
          <textarea placeholder="请输入字段说明" v-model="item.value" class="w-full" v-else-if="item.text_type === 'textarea'"></textarea>
        </template>
      </li>
    </ul>
    <v-nodata :data="data" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'

export default defineComponent({
  name: 'BasicInfoView',
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => {
        return
      }
    },
    coding: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Function,
      default: () => {
        return
      }
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },    
    auth: {
      type: Object,
      default: () => {
        return {
          checked: () => {
            return
          }
        }
      }
    },
  },
  emits: ['update:user'],
  setup(props, context) {
    let isEdit = ref(true)
    const dataList: any = ref(props.data)

    function Edit() {
      if (!props.auth.checked('edit')) {
        return
      }
      isEdit.value = !isEdit.value
      if (isEdit.value) {
        props.edit(props.data)
      }
    }

    return {
      isEdit,
      dataList,
      Edit
    }
  }
})
</script>

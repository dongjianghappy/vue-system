<template>
<div class="module-wrap m0">
  <div class="module-content basic-info">
    <div class="info-module">
      <span class="name">{{title}}</span>
      <div class="line"></div>
      <span class="update-info editbtn" @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
    </div>
    <ul class="info">
      <li class="pl100" v-for="(item, index) in dataList" :key="index">
        <label>{{item.remark}}</label>
        <div class="con" v-if="isEdit">{{item.value}}
          <span class="absolute" style="right: 0" v-if="isDelete">
            <v-confirm name="删除" :data="{id: item.id, ...data }" type="text" api="delete" :render="render" operating="delete" :auth="true"></v-confirm>
          </span>
        </div>
        <template v-else>
          <input type="text" v-model="item.value" class="input-sm input-full" v-if="item.text_type === 'single'">
          <textarea placeholder="请输入字段说明" v-model="item.value" class="w-full" v-else-if="item.text_type === 'textarea'"></textarea>
        </template>
      </li>
    </ul>
    <v-nodata :data="dataList" />
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from '@/utils'

export default defineComponent({
  name: 'BasicInfo',
  props: {
    title: {
      type: String,
      default: ""
    },
    dataList: {
      type: Array,
      default: () => {
        return
      }
    },
    data: {
      type: Array,
      default: () => {
        return
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
  setup(props, context) {
    let isEdit = ref(true)
    function Edit() {
      isEdit.value = !isEdit.value
      if (isEdit.value) {
        props.edit(props.dataList)
      }
    }

    return {
      isEdit,
      Edit
    }
  }
})
</script>

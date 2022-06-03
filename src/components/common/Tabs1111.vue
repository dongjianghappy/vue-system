<template>
  <div class="module-wrap m0">
    <div class="module-content basic-info">
      <div class="info-module">
        <span class="name">基本信息</span>
        <div class="line"></div>
        <span data-coding=""
              class="update-info editbtn"
              @click="Edit">{{!isEdit ? "保存" : "编辑"}}</span>
      </div>
      <ul class="info">
        <li v-for="(item, index) in data" :key="index">
          <label>{{item.remark}}</label>
          <div class="con"
               v-if="isEdit">{{item.value}}</div>
          <input type="text"
                 v-model="item.value"
                 class="input-sm"
                 v-else>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, computed } from 'vue'

export default defineComponent({
  name: 'AsideView111',
  props: {
    data: {
      type: Array,
      default: () => {return}
    },
    edit: {
      type: Function,
      default: () => {
        return 
      }
    }
  },
emits: ['update:user'],
setup(props,context) {
  let isEdit = ref(true)
  const dataList: any = ref(props.data)
 

function Edit(){
    isEdit.value = !isEdit.value
    if(isEdit.value){
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

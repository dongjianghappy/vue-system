<template>
<div class="module-wrap">
  <div class="module-head">
    <v-optionsbar title="添加地址">
      <template v-slot:extraright>
        <v-back />
      </template>
    </v-optionsbar>
  </div>
  <div class="module-content plr15">
    <ul class="form-wrap-box">
      <li class="vertical">
        <div class="label">标题名称</div>
        <input v-model="detail.source_name" type="text" placeholder="请输入标题名称" class="input-sm input-full" />
      </li>
      <li class="vertical">
        <div class="label">链接地址</div>
        <textarea placeholder="请输入链接地址" v-model="detail.source_url" class="w-full"></textarea>
      </li>
    </ul>
    <div class="mt25 align_center">
      <button class="btn btn-default btn-primary" @click="handleSave(data)">保存</button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  marked
} from 'marked';
import {
  defineComponent,
  ref,
  watch,
  useStore,
  codings
} from '@/utils'
import {
  tabsPartner
} from '@/assets/const'
import {
  PARTNER_TYPE,
} from '@/assets/enum'
import SpaceModal from '../../space/components/modalSpace.vue'
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
    const store = useStore();
    const isShow: any = ref(false)
    const coding: any = codings.content_source;
    const detail: any = ref({})

    function handleSave(){
      const { source_name, source_url } = detail.value
      
      store.dispatch('basic/Fetch', {
        api: 'insert',
        data: {
          coding,
          source_name,
          source_url
        }
      }).then((res: any) => {
        
      })
    }
</script>

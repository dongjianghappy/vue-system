<template>
  <label class="relative mr15 mt10 mb5" style="display: inline-block; line-height: 17px;">
    <input type="checkbox" v-model="data.checked" :checked="data.checked" class="mr5" style="float: left;"><span>显示</span>
  </label>
  <v-button class="btn" @onClick="saveTemp" v-if="action === 'add'">保存到草稿箱</v-button>
  <span class="mr10"><GetContent :data="data" /></span>
  <span class="mr10" v-if="action === 'edit'"><button class="btn btn-default btn-primary" @click="handleUpdate(data)">生成静态</button></span>
  <!-- <span><a class="btn btn-default btn-primary" :href="`http://www.${channelData.server}/${channelData.module}/${data.id}.html`" target="_blank">预览</a></span> -->
</template>

<script setup lang="ts">
import {
  defineProps,
  useProps,
  useStore
} from '@/utils'
import GetContent from './getContent.vue'
const store = useStore()
  const props: any = defineProps({
    ...useProps,
    channel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })

  // 保存到草稿箱
  function saveTemp() {
    store.dispatch('common/Fetch', {
      api: "articleTempSave",
      data: {
        type: props.channel.module,
        content: JSON.stringify(props.data)
      }
    }).then(res => {
      
    })
  }
</script>
